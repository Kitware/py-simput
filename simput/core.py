import yaml
import json
from pathlib import Path
import xml.etree.ElementTree as ET
from simput import constraints, filters

try:
    from yaml import CDumper as YAMLDumper
except ImportError:
    from yaml import Dumper as YAMLDumper

###############################################################################


def create_id_generator():
    count = 1
    while True:
        yield f"{count}"
        count += 1


def extract_ui(yaml_content):
    print("-" * 80)
    print("Start UI extract")
    print("-" * 80)
    ui_map = {}
    prop_indent = 10
    current_type = None
    current_list = []
    last_property = None
    for line in yaml_content.splitlines():
        stline = line.strip()
        sline = stline.split(":")[0]
        # Skip empty lines or comments
        if len(sline) == 0 or sline[0] == "#":
            # print(f"skip a: {sline}")
            continue

        indent = line.index(sline)
        if indent == 0:
            # Detect new object definition
            if current_type:
                print(f"Add ui for {current_type}")
                current_list.insert(0, f'<ui id="{current_type}">')
                current_list.append("</ui>")
                ui_map[current_type] = "\n".join(current_list)
                current_list = []
            current_type = line.strip().split(":")[0]
        else:
            # Detect property
            if prop_indent > indent:
                prop_indent = indent

            # skip hidden prop
            if stline == "_ui: skip":
                last_property = None
                current_list.pop()
                continue

            # skip object prop
            if stline == "_ui: object":
                current_list.pop()
                continue

            if stline == "type: object" and last_property:
                current_list.append(f'  <object name="{last_property}" />')

            if indent > prop_indent or sline[0] == "_":
                # print(f"skip b: {sline}")
                continue

            current_list.append(f'  <input name="{sline}" />')
            last_property = sline

    # Always have a ui container
    print(f"Add ui for {current_type}")
    current_list.insert(0, f'<ui id="{current_type}">')
    current_list.append("</ui>")
    ui_map[current_type] = "\n".join(current_list)
    print("-" * 80)

    return ui_map


def is_valid_value(v):
    if v is None:
        return False
    if isinstance(v, (str, bool, int, float)):
        return True
    if isinstance(v, (list, tuple)):
        for item in v:
            if not is_valid_value(item):
                return False
        return True

    return False


class ObjectManager:
    """Data Manager from model definition"""

    id_generator = create_id_generator()

    def __init__(self):
        self._manager_id = next(ObjectManager.id_generator)
        self._mtime = 1
        self._id = 1
        self._model_definition = {}
        self._object_map = {}
        self._listeners = {}
        self._listener_id = 1
        self._tag_map = {}
        self._obj_factory = ObjectFactory(self)

    @property
    def id(self):
        return self._manager_id

    def reset(self):
        prev_ids = list(self._object_map.keys())
        self._mtime = 1
        self._id = 1
        self._model_definition = {}
        self._object_map = {}
        self._emit("delete", ids=prev_ids)

    def _next_id(self):
        self._id += 1
        return self._id

    def modified(self):
        self._mtime += 1
        return self._mtime

    def _apply_mixin(self, *names):
        if len(names) == 0:
            names = self._model_definition.keys()

        for name in names:
            if name[0] == "_":
                continue
            object_definition = self._model_definition.get(name, {})
            mixins = object_definition.get("_mixins", [])
            for mixin_name in mixins:
                mixin = self._model_definition.get(mixin_name, {})
                object_definition.update(mixin)

    def _apply_initial(self, obj):
        """Return true if more initialization is required"""
        old_pending = obj["_pending_init"]
        rexec_pending = obj["_initial_refresh"]

        if len(old_pending) == 0 and len(rexec_pending) == 0:
            return False

        obj_id = obj["id"]
        obj_def = self.get_definition(obj["type"])
        new_pending = []
        rexec_update = 0

        # If a property is untouched by user we keep updating it from domain
        # using computed initial value (domain is owner of prop value)
        for prop in rexec_pending:
            if self.refresh(obj_id, prop):
                rexec_update += 1

        # Set any property value that has an "initial" that can resolve
        for prop in old_pending:
            prop_init_def = obj_def[prop]["initial"]
            if isinstance(prop_init_def, dict):
                # computed value
                itype = prop_init_def.get("type", None)
                if itype in constraints.__dict__:
                    if not constraints.__dict__[itype].initial(
                        self, obj, prop, prop_init_def, obj_def
                    ):
                        new_pending.append(prop)
                else:
                    print(f"==> Don't know what to do with {itype}")
                    new_pending.append(prop)
            else:
                # basic static typed value
                obj["properties"][prop] = prop_init_def

        obj["_pending_init"] = new_pending

        # Did we manage to update a proprety?
        return len(old_pending) != len(new_pending) or rexec_update > 0

    # -------------------------------------------------------------------------
    # Object Factory
    # -------------------------------------------------------------------------

    def register_construtor(self, class_name, constructor):
        """
        Provide binding to concrete object in case we want to map
        our data model to an actual object.
        """
        self._obj_factory.register(class_name, constructor)

    def get_object(self, obj_id):
        """From id, return concrete object if any"""
        return self._obj_factory.get(obj_id)

    def update_object(self, obj_id, *prop_names):
        """
        Flush listed property names onto the concrete object.
        Return true if something changed.
        """
        obj = self.get(obj_id)
        obj_properties = obj.get("properties", {})
        properties = obj_properties

        if len(prop_names):
            properties = {}
            for name in prop_names:
                properties[name] = obj_properties[name]

        return self._push(obj_id, properties)

    def _push(self, obj_id, properties):
        """
        Internal helper for pushing properly decorated property values
        to its concrete representation.
        """
        obj_type = self.get(obj_id).get("type")
        obj_def = self.get_definition(obj_type)
        props_decorated = {}
        for prop_name in properties:
            if properties[prop_name] is None:
                continue
            prop_type = obj_def[prop_name].get("type", "string")
            if prop_type == "object":
                props_decorated[prop_name] = self.get_object(properties[prop_name])
            else:
                props_decorated[prop_name] = properties[prop_name]

        return self._obj_factory.push(obj_id, props_decorated)

    def refresh(self, obj_id, prop_name):
        """Force domain exectution on given property"""
        obj = self.get(obj_id)

        if obj is None:
            return False

        obj_def = self.get_definition(obj["type"])

        __init_def = obj_def[prop_name]["initial"]
        itype = __init_def.get("type", None)
        if itype in constraints.__dict__:
            if constraints.__dict__[itype].initial(
                self, obj, prop_name, __init_def, obj_def
            ):
                obj["_user_edit"].discard(prop_name)
                if __init_def.get("refresh", False) == "auto":
                    obj["_initial_refresh"].add(prop_name)
                    obj["_initial_prop_dep"].add(__init_def.get("property"))

                return True

        return False

    # -------------------------------------------------------------------------
    # Event handling
    # -------------------------------------------------------------------------

    def _emit(self, topic, **kwargs):
        for listener in self._listeners.values():
            listener(topic, **kwargs)

    def on_change(self, fn_callback):
        """
        Register callback when something is changing in ObjectManager.

        fn(topic, **kwars)
        => topic='create' | ids=[]
        => topic='change' | ids=[]
        => topic='delete' | ids=[]

        Return subscription ID
        """
        self._listener_id += 1
        subscription_id = self._listener_id
        self._listeners[subscription_id] = fn_callback

        return subscription_id

    def off(self, subscription):
        """
        Unregister subscription using its ID
        """
        if subscription in self._listeners:
            del self._listeners[subscription]

    # -------------------------------------------------------------------------
    # Definition handling
    # -------------------------------------------------------------------------

    def load_model(self, yaml_file=None, yaml_content=None):
        """Load Data Model from YAML definition"""
        if yaml_file:
            path = Path(yaml_file)
            if path.exists():
                yaml_content = path.read_text(encoding="UTF-8")

        if yaml_content:
            add_on_dict = yaml.safe_load(yaml_content)
            self._model_definition.update(add_on_dict)
            self._apply_mixin(*add_on_dict.keys())
            return True

        return False

    def get_definition(self, obj_type):
        """Return a loaded definition for a given object_type"""
        return self._model_definition[obj_type]

    @property
    def available_types(self):
        """List all the object_types that have been loaded"""
        return self._model_definition.keys()

    # -------------------------------------------------------------------------
    # Object management
    # -------------------------------------------------------------------------

    def create(self, object_type, **initial_values):
        """
        Create a new instance of a data-object using an object_type along with
        maybe a set of property values that we want to pre-initialise using the
        **kwargs approach.
        """
        _id = self._next_id()
        _type = object_type
        _mtime = self.modified()
        _properties = {}
        _pending_init = []
        _obj_props = []
        _obj_deps = []
        _tags = []
        _initial_prop_dep = set()
        _initial_refresh = set()

        obj_out = {
            # public keys
            "id": _id,
            "tags": _tags,
            "type": _type,
            "mtime": _mtime,
            "properties": _properties,
            # helper for fast indexing
            "_pending_init": _pending_init,
            "_obj_props": _obj_props,
            "_obj_deps": _obj_deps,
            "_user_edit": set(),
            "_initial_prop_dep": _initial_prop_dep,
            "_initial_refresh": _initial_refresh,
        }

        # Can't create object if no definition available
        if object_type not in self._model_definition:
            raise ValueError(
                f"Object of type: {object_type} was not found in our loaded model definitions"
            )

        # Get Object Definition
        obj_def = self.get_definition(object_type)

        # Create concrete object if possible
        self._obj_factory.create(_id, _type)

        # Add tags
        _tags.extend(obj_def.get("_tags", []))
        _tags.extend(initial_values.get("_tags", []))

        # Add name if any was provided
        if "_name" in initial_values:
            obj_out["name"] = initial_values["_name"]

        # Register ourself
        self._object_map[_id] = obj_out
        for tag in _tags:
            if tag not in self._tag_map:
                self._tag_map[tag] = set()
            self._tag_map[tag].add(_id)

        for prop in obj_def:
            # Skip private/internal keys
            if prop[0] == "_":
                continue
            _properties[prop] = None

            # Index property object ref
            if obj_def[prop]["type"] == "object":
                _obj_props.append(prop)

            # Register domain initialization prop dependency
            if "initial" in obj_def[prop]:
                __init_def = obj_def[prop]["initial"]
                if isinstance(__init_def, dict) and __init_def.get("refresh", False):
                    if __init_def.get("refresh") == "auto":
                        _initial_prop_dep.add(__init_def.get("property"))
                        obj_out["_initial_refresh"].add(prop)

            # Initial value override
            if prop in initial_values:
                _properties[prop] = initial_values[prop]
                # Convert simput obj into its ID
                if isinstance(_properties[prop], dict):
                    _properties[prop] = _properties[prop].get("id", None)
            elif "initial" in obj_def[prop]:
                _pending_init.append(prop)

        # Initialize values using constraints
        while self._apply_initial(obj_out):
            pass

        # Push/Fetch any initial properties from concrete object
        self._push(_id, _properties)
        self._obj_factory.pull(_id, _properties)

        # Try to initialize any values in case it is now possible
        need_extra_push = False
        while self._apply_initial(obj_out):
            need_extra_push = True

        if need_extra_push:
            self._push(_id, _properties)

        self._emit("create", ids=[_id])

        return obj_out

    def delete(self, object_id, trigger_modified=True):
        """
        Delete object along with its dependency that it is owner of
        """
        before_delete = set(self._object_map.keys())
        # Delete ourself
        obj_to_delete = self._object_map[object_id]
        del self._object_map[object_id]
        for tag in obj_to_delete.get("tags"):
            self._tag_map.remove(object_id)
        self._obj_factory.delete(object_id)

        # Delete objects that we own
        for dep_id in obj_to_delete["_obj_deps"]:
            self.delete(dep_id, False)

        if trigger_modified:
            after_delete = set(self._object_map.keys())
            self.modified()
            self._emit("delete", ids=list(before_delete.difference(after_delete)))

    def get(self, object_id):
        """
        object = {
            id: 2143,
            name: "", // <= optional
            tags: [],
            type: Plane
            mtime: 94747,
            properties: {
                Origin: [0, 0, 0],
                Normal: [1, 0, 0],
            },
        }
        """
        return self._object_map[object_id] if object_id in self._object_map else None

    def update(self, change_set):
        """
        changeSet = [
            { id: 2143, name: 'Origin', value: [0, 1, 3] },
            ...
        ]
        """
        mtime = self.modified()
        dirty_ids = set()
        __flush_initialize = set()
        for change in change_set:
            obj_id = change["id"]
            prop = change["name"]
            value = change["value"]
            dirty_ids.add(obj_id)
            obj = self.get(obj_id)
            obj["properties"][prop] = value
            obj["mtime"] = mtime
            obj["_user_edit"].add(prop)
            obj["_initial_refresh"].discard(prop)
            if prop in obj["_initial_prop_dep"]:
                __flush_initialize.add(obj_id)

        for __id in __flush_initialize:
            self._apply_initial(self.get(__id))

        for dirty_id in dirty_ids:
            props = self.get(dirty_id).get("properties")
            self._push(dirty_id, props)

        self._emit("change", ids=list(dirty_ids))

    def get_type(self, obj_type):
        """
        Return all the instances of the given type
        """
        result = []
        for obj in self._object_map.values():
            if obj["type"] == obj_type:
                result.append(obj)

        return result

    def tags(self, *args):
        """List all instances containing all the listed tags"""
        selected_ids = set(self._object_map.keys())
        for tag in args:
            if tag in self._tag_map:
                selected_ids &= self._tag_map[tag]
            else:
                return []

        result = []
        for obj_id in selected_ids:
            result.append(self._object_map[obj_id])

        return result

    def types(self, *with_tags):
        """List object_types from definition that has the set of provided tags"""
        result = []
        tag_filter = set(with_tags)
        for type_name in self._model_definition.keys():
            has_tag = set(self._model_definition[type_name].get("_tags", []))
            if tag_filter.issubset(has_tag):
                result.append(type_name)

        return result

    # -------------------------------------------------------------------------
    # Import / Export
    # -------------------------------------------------------------------------

    def save(self, file_output=None):
        """Export state (definition+data) into a file"""
        data = {
            "model": self._model_definition,
            "objects": self._object_map,
        }
        if file_output:
            with open(file_output, "w") as outfile:
                json.dump(data, outfile)
        else:
            return json.dumps(data)

    def load(self, file_input=None, file_content=None):
        """Load previously exported state from a file"""
        if file_input:
            with open(file_input) as json_file:
                data = json.load(json_file)
        else:
            data = json.loads(file_content)

        self._model_definition.update(data["model"])

        # Remap objects to new ids
        _id_remap = {}
        _new_ids = []
        _old_objects = data["objects"]
        for old_id in _old_objects:
            obj = _old_objects[old_id]
            new_id = self._next_id()
            obj["id"] = new_id

            _new_ids.append(new_id)
            _id_remap[old_id] = new_id
            self._object_map[new_id] = obj

        # Remap object property to new ids
        for obj_id in _new_ids:
            obj = self.get(obj_id)
            for prop in obj["_obj_props"]:
                obj[prop] = _id_remap[obj[prop]]
            new_deps = []
            for old_id in obj["_obj_deps"]:
                new_deps = _id_remap[old_id]
            obj["_obj_deps"] = new_deps

        # Remap tags
        for obj_id in _new_ids:
            obj = self.get(obj_id)
            for tag in obj.get("tags", []):
                if tag not in self._tag_map:
                    self._tag_map[tag] = set()
                self._tag_map[tag].add(obj_id)

        # Remap concreate objects
        for obj_id in _new_ids:
            obj = self.get(obj_id)
            vtk_obj = self._obj_factory.create(obj_id, obj.get("type"))
            # print("create", obj.get("type"), obj_id, vtk_obj)
            self._push(obj_id, obj.get("properties"))

        self._emit("create", ids=_new_ids)


###############################################################################


class UIManager:
    """UI Manager provide UI information to edit and input object properties"""

    id_generator = create_id_generator()

    def __init__(self, obj_manager, ui_resolver):
        self._manager_id = next(UIManager.id_generator)
        self._obj_manager = obj_manager
        self._ui_resolver = ui_resolver
        self._ui_xml = {}
        self._ui_lang = {}
        self._ui_resolved = {}
        # event handling
        self._listeners = {}
        self._listener_id = 1

    @property
    def id(self):
        return f"{self._obj_manager.id}:{self._manager_id}"

    def _build_ui(self):
        pass

    @property
    def object_manager(self):
        """Return linked object manager"""
        return self._obj_manager

    def clear_ui(self):
        """Clear any loaded UI definition"""
        self._ui_xml = {}
        self._ui_resolved = {}

    # -------------------------------------------------------------------------
    # Definition handling
    # -------------------------------------------------------------------------

    def load_language(self, yaml_file=None, yaml_content=None, clear_ui=False):
        """Load langage for the objects form"""
        if clear_ui:
            self.clear_ui()

        if yaml_file:
            path = Path(yaml_file)
            if path.exists():
                yaml_content = path.read_text(encoding="UTF-8")

        if yaml_content:
            self._ui_lang.update(yaml.safe_load(yaml_content))
            auto_ui = extract_ui(yaml_content)
            self._ui_resolved = {}
            ui_change_count = 0
            for ui_type in auto_ui:
                if ui_type not in self._ui_xml:
                    self._ui_xml[ui_type] = auto_ui[ui_type]
                    ui_change_count += 1

            if ui_change_count:
                self._emit("lang+ui")
            else:
                self._emit("lang")

            return True

        return False

    def load_ui(self, xml_file=None, xml_content=None, clear_ui=False):
        """Load layout for the objects form"""
        if clear_ui:
            self.clear_ui()

        if xml_file:
            path = Path(xml_file)
            if path.exists():
                xml_content = path.read_text(encoding="UTF-8")

        if xml_content:
            root = ET.fromstring(xml_content)
            for child in root:
                obj_type = child.attrib["id"]
                self._ui_xml[obj_type] = ET.tostring(child).decode("UTF-8").strip()

            self._ui_resolved = {}
            self._emit("ui")
            return True

        return False

    # -------------------------------------------------------------------------
    # Event handling
    # -------------------------------------------------------------------------

    def _emit(self, topic, **kwargs):
        for listener in self._listeners.values():
            listener(topic, **kwargs)

    def on_change(self, fn_callback):
        """
        Register callback when something is changing in ObjectManager.

        fn(topic, **kwars)
        => topic='ui'
        => topic='lang'
        => topic='lang+ui'

        Return subscription ID
        """
        self._listener_id += 1
        subscription_id = self._listener_id
        self._listeners[subscription_id] = fn_callback

        return subscription_id

    def off(self, subscription):
        """
        Unregister subscription using its ID
        """
        if subscription in self._listeners:
            del self._listeners[subscription]

    # -------------------------------------------------------------------------
    # UI handling
    # -------------------------------------------------------------------------

    def data(self, object_id):
        """Return object model with property values (private keys stripped off)"""
        _src = self._obj_manager.get(object_id)
        _dst = {}
        _dst.update(_src)
        for key in _src:
            if key[0] == "_":
                del _dst[key]

        return _dst

    def constraints(self, object_id):
        """Return hints for applying constraints locally"""
        result = {}
        obj = self._obj_manager.get(object_id)
        obj_def = self._obj_manager.get_definition(obj["type"])
        for prop_name, prop_def in obj_def.items():
            if "constraints" in prop_def:
                container = {}
                result[prop_name] = container
                for constraint in prop_def["constraints"]:
                    key = (
                        constraint["name"]
                        if "name" in constraint
                        else constraint["type"]
                    )
                    value = constraints.is_valid(
                        self._obj_manager,
                        obj,
                        prop_name,
                        constraint,
                        constraints=prop_def["constraints"],
                    )
                    available = constraints.available(
                        self._obj_manager,
                        obj,
                        constraint,
                        constraints=prop_def["constraints"],
                    )
                    container[key] = {
                        "value": value,
                        "available": available,
                    }

        return result

    def ui(self, object_type):
        """Return resolved layout"""
        if object_type in self._ui_resolved:
            return self._ui_resolved[object_type]

        model_def = self._obj_manager.get_definition(object_type)
        lang_def = self._ui_lang[object_type]
        ui_def = self._ui_xml[object_type]
        resolved = self._ui_resolver.resolve(model_def, lang_def, ui_def)
        resolved = resolved.decode("UTF-8")
        self._ui_resolved[object_type] = resolved

        return resolved


class ObjectFactory:
    """Concrete object helper"""

    def __init__(self, _obj_manager):
        self._obj_manager = _obj_manager
        self._map = {}
        self._instances = {}

    def register(self, name, klass):
        """Register constructor to match definition type"""
        self._map[name] = klass

    def create(self, obj_id, name, **kwargs):
        """Try to create concreate oject"""
        obj = None
        if name in self._map:
            obj = self._map[name](**kwargs)

        if name in globals():
            obj = globals()[name](**kwargs)

        if obj:
            self._instances[obj_id] = obj

        if obj is None:
            print("Could not instantiate", name)

        return obj

    def delete(self, obj_id):
        """Delete concrete object if available"""
        if obj_id in self._instances:
            del self._instances[obj_id]

    def get(self, obj_id):
        """Get concrete object from its ID"""
        if obj_id in self._instances:
            return self._instances[obj_id]
        return None

    def id(self, obj):
        """
        Find id of concreate object if it was previously registered.
        -1 otherwise
        """
        for id, instance in self._instances.items():
            if instance == obj:
                return id
        return "-1"

    def push(self, obj_id, properties):
        """
        Given the properties, push them to the given object ID
        """
        obj = self.get(obj_id)

        if obj is None:
            return False

        obj_type = self._obj_manager.get(obj_id).get("type")
        obj_def = self._obj_manager.get_definition(obj_type)

        # Wrong too VTK specific
        before_mtime = obj.GetMTime()
        change_detected = False
        if obj:
            for name in properties:
                if "_set" in obj_def[name]:
                    actions = obj_def[name]["_set"]
                    if not isinstance(actions, list):
                        actions = [actions]
                    for action in actions:
                        method_name = action.get("method", None)
                        filter = action.get("filter", None)
                        kwargs = action.get("kwargs", {})
                        if filter:
                            filters.__dict__[filter](
                                self._obj_manager, obj_id, name, method_name, **kwargs
                            )
                        else:
                            # print(f"{method_name}({kwargs})")
                            getattr(obj, method_name)(**kwargs)

                else:
                    fn_name = f"Set{name}"
                    if hasattr(obj, fn_name):
                        fn = getattr(obj, fn_name)
                        # print(f"{fn_name}({properties[name]})")
                        fn(properties[name])

                    fn_name = f"set{name}"
                    if hasattr(obj, fn_name):
                        fn = getattr(obj, fn_name)
                        # print(f"{fn_name}({properties[name]})")
                        fn(properties[name])

        # Wrong too VTK specific
        after_mtime = obj.GetMTime()
        change_detected = before_mtime != after_mtime

        return change_detected

    def pull(self, obj_id, properties):
        """Read values from concrete object and update the provided properties dict"""
        obj = self.get(obj_id)
        if obj is None:
            return False, []

        obj_type = self._obj_manager.get(obj_id).get("type")
        obj_def = self._obj_manager.get_definition(obj_type)

        props_updated = []
        if obj:
            for name in properties:
                if "_get" in obj_def[name]:
                    read_def = obj_def[name]["_get"]
                    if read_def == "skip":
                        pass
                    elif read_def:
                        print("Not sure how to handle read from custom method/filter")
                        print(read_def)
                        pass
                elif "initial" in obj_def[name]:
                    # We should not pull if initial is defined
                    pass
                else:
                    known_value = properties[name]
                    current_value = known_value

                    fn_name = f"Get{name}"
                    if hasattr(obj, fn_name):
                        fn = getattr(obj, fn_name)
                        current_value = fn()

                    fn_name = f"get{name}"
                    if hasattr(obj, fn_name):
                        fn = getattr(obj, fn_name)
                        current_value = fn()

                    if known_value != current_value and is_valid_value(current_value):
                        props_updated.append(name)
                        properties[name] = current_value

        change_detected = len(props_updated) > 0
        return change_detected, props_updated
