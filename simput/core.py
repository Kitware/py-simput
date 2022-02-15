import yaml
import json
from pathlib import Path
import xml.etree.ElementTree as ET
from simput import filters
from simput import ui

# -----------------------------------------------------------------------------
# Generic ID generator
# -----------------------------------------------------------------------------
def create_id_generator(prefix=""):
    count = 1
    while True:
        yield f"{prefix}{count}"
        count += 1


# -----------------------------------------------------------------------------
# Helper method to help detect changes when setting new property value
# -----------------------------------------------------------------------------
def is_equal(a, b):
    # might need some deeper investigation
    return a == b


###############################################################################
# "Remoting" layers
###############################################################################

# -----------------------------------------------------------------------------
# ObjectValue
# -----------------------------------------------------------------------------
# Light weight object with convinient API that can be easily serialized and
# shared across locations.
# -----------------------------------------------------------------------------
class ObjectValue:
    __available_types = {}

    @staticmethod
    def create(value_type, state):
        if value_type in ObjectValue.__available_types:
            return ObjectValue.__available_types[value_type](state)

        raise TypeError(f"Could not find ObjectValue from {value_type}")

    @staticmethod
    def register(name, constructor):
        ObjectValue.__available_types[name] = constructor


# -----------------------------------------------------------------------------
# Proxy
# -----------------------------------------------------------------------------
# A Proxy keep track of a set of a properties for an other object.
# Proxy can flush its local state to the object it controls by calling commit().
# To reset uncommited changes, just call reset().
# Proxy properties can be access with the . and [] notation.
# Proxy have states that are easily serializable.
# -----------------------------------------------------------------------------
class Proxy:
    __id_generator = create_id_generator()
    __api = set(
        [
            "definition",
            "id",
            "type",
            "object",
            "manager",
            "modified",
            "mtime",
            "edited_property_names",
            "tags",
            "own",
            "set_property",
            "get_property",
            "list_property_names",
            "commit",
            "reset",
            "on",
            "off",
            "state",
            "remap_ids",
        ]
    )

    def __init__(
        self,
        __proxy_manager,
        __type,
        __object=None,
        _name=None,
        _tags=[],
        _push_fn=None,
        **kwargs,
    ):
        self._id = next(Proxy.__id_generator)
        self._name = _name or __type
        self._mtime = __proxy_manager.mtime
        self._proxy_manager = __proxy_manager
        self._type = __type
        self._pushed_properties = {}
        self._properties = {}
        self._dirty_properties = set()
        self._listeners = set()
        self._tags = set(_tags)
        self._tags.update(self.definition.get("_tags", []))
        self._push_fn = _push_fn if _push_fn is not None else push

        # Proxy can be fully virtual (:None)
        self._object = __object
        # proxy id that we created and therefore that we should manage
        self._own = set()

        # Handle registration
        self._proxy_manager._id_map[self._id] = self
        for tag in self._tags:
            self._proxy_manager._tag_map.setdefault(tag, set()).add(self._id)

        # handle initial
        for _prop_name, _prop_def in self.definition.items():
            if _prop_name.startswith("_"):
                continue

            _init_def = _prop_def.get("initial", None)
            _type = _prop_def.get("type", "")
            if _prop_name in kwargs:
                self.set_property(_prop_name, kwargs[_prop_name])
            elif _type.startswith("value::"):
                self.set_property(_prop_name, _init_def)
            elif isinstance(_init_def, dict):
                print("+++ Don't know how to deal with domain yet", _init_def)
            elif _init_def:
                self.set_property(_prop_name, _init_def)
            else:
                self.set_property(_prop_name, None)

    @property
    def definition(self):
        """Return Proxy definition"""
        return self._proxy_manager.get_definition(self._type)

    @property
    def id(self):
        """Return Proxy ID"""
        return self._id

    @property
    def type(self):
        """Return Proxy Type"""
        return self._type

    @property
    def object(self):
        """Return Proxy concrete object if any"""
        return self._object

    @property
    def manager(self):
        """Return ProxyManager that owns us"""
        return self._proxy_manager

    def modified(self):
        """Mark proxy modified"""
        self._mtime = self.manager.modified()

    @property
    def mtime(self):
        """Return proxy modified time"""
        return self._mtime

    @property
    def edited_property_names(self):
        """Return the list of properties that needs to be pushed"""
        return self._dirty_properties

    @property
    def tags(self):
        """Return the list of tags of that proxy"""
        return self._tags

    @tags.setter
    def tags(self, value):
        """Update proxy tag"""
        self._tags = set(value)

    @property
    def own(self):
        """List of proxy ids we created"""
        return self._own

    @own.setter
    def own(self, ids):
        """Update list of proxy we own"""
        if isinstance(ids, str):
            # single id
            self._own.add(ids)
        elif isinstance(ids, Proxy):
            self._own.add(ids.id)
        else:
            self._own.update(ids)

    def set_property(self, name, value):
        """Update a property on that proxy"""
        # convert any invalid indirect value (proxy, object)
        prop_type = self.definition.get(name).get("type", "string")
        safe_value = value
        if value is not None:
            if prop_type == "proxy" and not isinstance(value, str):
                safe_value = value.id
            if prop_type.startswith("value::") and not isinstance(value, ObjectValue):
                safe_value = ObjectValue.create(prop_type, value)

        # check if change
        change_detected = False
        prev_value = self._properties.get(name, None)
        saved_value = self._pushed_properties.get(name, None)
        if is_equal(safe_value, saved_value):
            self._dirty_properties.discard(name)
        elif not is_equal(safe_value, prev_value):
            self._dirty_properties.add(name)
            change_detected = True
        self._properties[name] = safe_value

        if change_detected:
            self._proxy_manager.dirty_ids.add(self._id)

        self._emit(
            "update",
            modified=change_detected,
            property_name=name,
            properties_dirty=list(self._dirty_properties),
        )

        return change_detected

    def get_property(self, name, default=None):
        """Return a property value"""
        value = self._properties.get(name, default)
        if "proxy" == self.definition.get(name).get("type"):
            return self._proxy_manager.get(self._properties.get(name))

        return value

    def list_property_names(self):
        """Return the list of property names"""
        return [name for name in self.definition if not name.startswith("_")]

    def commit(self):
        """Flush modified properties"""
        self._proxy_manager.dirty_ids.discard(self._id)
        if self._dirty_properties:
            properties_dirty = list(self._dirty_properties)
            if self._object:
                self._push_fn(self)

            self._pushed_properties.update(self._properties)
            self._dirty_properties.clear()

            for _sub_id in self.own:
                self._proxy_manager.get(_sub_id).commit()

            self._emit("commit", properties_dirty=properties_dirty)
            return True
        return False

    def reset(self):
        """Undo any uncommited properties"""
        self._proxy_manager.dirty_ids.discard(self._id)
        if self._dirty_properties:
            properties_dirty = list(self._dirty_properties)
            self._dirty_properties.clear()
            self._properties.update(self._pushed_properties)
            self._emit("reset", properties_dirty=properties_dirty)
            return True

    def on(self, fn):
        """
        Register listener:
        fn(topic, **kwars)
        => topic='reset' | properties_dirty=[]
        => topic='commit' | properties_dirty=[]
        => topic='update' | modified=bool, properties_dirty=[], properties_change=[]
        """
        self._listeners.add(fn)

    def off(self, fn):
        """Unegister listener"""
        self._listeners.discard(fn)

    def _emit(self, topic, *args, **kwargs):
        for fn in self._listeners:
            try:
                fn(topic, *args, **kwargs)
            except:
                print(f"Error calling {fn} for {topic}:{args}, {kwargs}")

    def __getitem__(self, name):
        """value = proxy[prop_name]"""

        if self._properties and name in self._properties:
            if "proxy" == self.definition.get(name).get("type"):
                return self._proxy_manager.get(self._properties.get(name))

            return self._properties[name]

        # print("ERROR: __getitem__", name)

        raise AttributeError()

    def __setitem__(self, name, value):
        """proxy[prop_name] = value"""
        if name in self._properties and self.set_property(name, value):
            self._emit(
                "update",
                modified=True,
                properties_dirty=list(self._dirty_properties),
                properties_change=[name],
            )
        else:
            print(f"Attribute {name} is not defined for {self._elem_name}")

    def __getattr__(self, name: str):
        """value = proxy.prop_name"""
        if name.startswith("_"):
            return self.__dict__.get(name, None)

        if name in Proxy.__api:
            return self.__dict__.get(name, None)

        # Fallback to properties
        return self.__getitem__(name)

    def __setattr__(self, name: str, value):
        """proxy.prop_name = value"""
        if name.startswith("_"):
            super().__setattr__(name, value)

        if self._properties and name in self._properties:
            self.__setitem__(name, value)
        else:
            super().__setattr__(name, value)

    @property
    def state(self):
        """Return proxy state that is easily serializable"""
        _properties = {}
        _obj_def = self.definition

        for prop_name, prop_def in _obj_def.items():
            if prop_name.startswith("_"):
                continue

            if prop_def.get("type", "").startswith("value::"):
                _obj = self._properties.get(prop_name, None)
                if _obj:
                    _properties[prop_name] = _obj.state
                else:
                    _properties[prop_name] = ""
            else:
                _properties[prop_name] = self._properties.get(prop_name, None)

        return {
            "id": self._id,
            "type": self._type,
            "name": self._name,
            "tags": list(self._tags),
            "mtime": self._mtime,
            "own": list(self._own),
            "properties": _properties,
        }

    @state.setter
    def state(self, value):
        """Use to rebuild a proxy state from an exported state"""
        self._own = set(value.get("own", []))
        self._tags.update(value.get("tags", []))
        for prop_name, prop_value in value.get("properties", {}).items():
            self.set_property(prop_name, prop_value)

        for tag in self._tags:
            self._proxy_manager._tag_map.setdefault(tag, set()).add(self._id)

    def remap_ids(self, id_map):
        """Use to remap id when reloading an exported state"""
        # Update proxy dependency
        _new_own = set()
        for old_id in self._own:
            _new_own.add(id_map[old_id])
        self._own = _new_own

        # Update proxy props
        for prop_name, prop_def in self.definition.items():
            if prop_name.startswith("_"):
                continue
            if prop_def.get("type", "") == "proxy":
                self._properties[prop_name] = id_map[self._properties[prop_name]]


# -----------------------------------------------------------------------------
# Domain
# -----------------------------------------------------------------------------
# A Domain is responsible for:
#  - testing if a property is valid
#  - compute and set a property value
#  - list what are the possible value options
#
# Domain meta information:
# - level describe the importance of the domain
#    (0: info), (1: warning), (2: error)
# - message personalize the context in which a given domain is used to help
#   understand why a given value is not valid.
# -----------------------------------------------------------------------------
class PropertyDomain:
    def __init__(self, _proxy: Proxy, _property: str, _proxy_domain_manager, **kwargs):
        self._proxy = _proxy
        self._property_name = _property
        self._proxy_domain_manager = _proxy_domain_manager
        self._dependent_properties = set([self._property_name])
        self._need_set = "initial" in kwargs
        self._level = kwargs.get("level", 0)
        self._message = kwargs.get("message", str(__class__))
        self._should_compute_value = "initial" in kwargs

    def enable_set_value(self):
        """Reset domain set so it can re-compute a default value"""
        self._should_compute_value = True

    def set_value(self):
        """
        Ask domain to compute and set a value to a property.
        return True if the action was succesful.
        """
        return False

    def available(self):
        """List the available options"""
        return None

    @property
    def value(self):
        """Return the current proxy property value on which the domain is bound"""
        return self._proxy[self._property_name]

    @value.setter
    def value(self, v):
        """Set the proxy property value"""
        self._proxy.set_property(self._property_name, v)

    def valid(self, required_level=2):
        """Return true if the current proxy property value is valid for the given level"""
        return True

    @property
    def level(self):
        """Return current domain level (0:info, 1:warn, 2:error)"""
        return self._level

    @level.setter
    def level(self, value):
        """Update domain level"""
        self._level = value

    @property
    def message(self):
        """Associated domain message that is used for hints"""
        return self._message

    @message.setter
    def message(self, value):
        """Update domain message"""
        self._message = value

    def hints(self):
        """Return a set of (level, message) when running the validation for the info level"""
        if self.valid(-1):
            return []
        return [
            {
                "level": self._level,
                "message": self._message,
            }
        ]


# -----------------------------------------------------------------------------
# ProxyDomain
# -----------------------------------------------------------------------------
# A ProxyDomain is responsible for:
# - keeping track of all the domains attached to a given proxy
# -----------------------------------------------------------------------------
class ProxyDomain:
    __prop_domain_availables = {}

    @staticmethod
    def register_property_domain(name: str, constructor):
        ProxyDomain.__prop_domain_availables[name] = constructor

    def __init__(self, _proxy, _domain_manager):
        self._proxy = _proxy
        self._domain_manager = _domain_manager
        self._domains = {}
        self._dirty_props = set()

        # Monitor proxy change
        _proxy.on(self._on_proxy_change)

        # Build domains for given proxy
        definition = _proxy.definition
        _domains = self._domains
        for name in definition:
            if name.startswith("_"):
                continue
            _prop_domains = _domains.setdefault(name, {})
            for domain_def in definition[name].get("domains", []):
                _type = domain_def.get("type")
                _name = domain_def.get("name", _type)
                if _type in ProxyDomain.__prop_domain_availables:
                    domain_inst = ProxyDomain.__prop_domain_availables[_type](
                        _proxy, name, self._domain_manager, **domain_def
                    )
                    if _name not in _prop_domains:
                        _prop_domains[_name] = domain_inst
                    else:
                        count = 1
                        while f"{_name}_{count}" in _prop_domains:
                            count += 1
                        _prop_domains[f"{_name}_{count}"] = domain_inst

                    # Try default set
                    domain_inst.set_value()
                else:
                    print(f"Could not find domain of type: {_type}")

    def __del__(self):
        self._proxy.off(self._on_proxy_change)

    def _on_proxy_change(
        self, topic, modified=False, properties_dirty=[], properties_change=[], **kwargs
    ):
        if topic == "update":
            self._dirty_props.update(properties_dirty)
            self._dirty_props.update(properties_change)
            self._domain_manager.dirty(self._proxy.id)

    def apply(self, *property_names):
        """
        Ask domains to set values or just for one property if property_name is provided.
        Return the number of properties that have been updated.
        """
        change_count = 0
        selection = self._domains
        if property_names:
            selection = {}
            for name in property_names:
                selection[name] = self._domains.get(name, {})

        for prop_domains in selection.values():
            for domain in prop_domains.values():
                if domain.set_value():
                    change_count += 1

        return change_count

    def get_property_domains(self, prop_name):
        """Helper to get the map of domains linked to a property"""
        return self._domains.get(prop_name, {})

    @property
    def state(self):
        """
        Return a serializable state of the domains linked to a proxy.
        This include for each property and each domain a `valid` and `available` property.
        Also at the property level a list of `hints`.

        ```
        state = {
            ContourBy: {
                FieldSelector: {
                    valid: True,
                    available: [
                        { text: "Temperature", value: "Point::Temperature", ... },
                        ...
                    ]
                },
                hints: [],
            },
            Scalar: {
                Range: {
                    valid: True,
                    available: [0.5, 123.5],
                },
                hints: [
                    { level: 0, message: "Outside of range (0.5, 123.5)" },
                ],
            },
        }
        ```
        """
        output = {}
        for prop_name, prop_domains in self._domains.items():
            prop_info = {}
            hints = []

            for domain_name, domain_inst in prop_domains.items():
                available = domain_inst.available()
                valid = domain_inst.valid()
                hints += domain_inst.hints()
                if available or not valid:
                    prop_info[domain_name] = {"available": available, "valid": valid}

            if prop_info or hints:
                prop_info["hints"] = hints
                output[prop_name] = prop_info

        return output


# -----------------------------------------------------------------------------
# ProxyManagerLifeCycleListener
# -----------------------------------------------------------------------------
# Allow to decorate ProxyManager to extend default behavior by hooking to
# life cycle calls.
# -----------------------------------------------------------------------------
class ProxyManagerLifeCycleListener:
    def __init__(self):
        self._pxm = None

    def set_proxymanager(self, pxm):
        self._pxm = pxm

    def before_modified(self, mtime, **kwargs):
        pass

    def after_modified(self, mtime, **kwargs):
        pass

    def before_load_model(self, definition, **kwargs):
        pass

    def after_load_model(self, definition, **kwargs):
        pass

    def proxy_create_before(self, proxy_type, initial_values, **kwargs):
        pass

    def proxy_create_before_commit(self, proxy_type, initial_values, proxy, **kwargs):
        pass

    def proxy_create_after_commit(self, proxy_type, initial_values, proxy, **kwargs):
        pass

    def proxy_delete_before(self, proxy_id, trigger_modified, **kwargs):
        pass

    def proxy_delete_after_self(self, proxy_id, trigger_modified, proxy, **kwargs):
        pass

    def proxy_delete_after_own(self, proxy_id, trigger_modified, proxy, **kwargs):
        pass

    def proxy_update_before(self, change_set, **kwargs):
        pass

    def proxy_update_after(self, change_set, dirty_ids, **kwargs):
        pass

    def export_before(self, file_output, **kwargs):
        pass

    def export_after(self, file_output, data, **kwargs):
        pass

    def import_before(self, file_input, file_content, **kwargs):
        pass

    def import_before_processing(self, file_input, file_content, data, **kwargs):
        pass

    def import_after(self, file_input, file_content, data, new_ids, id_remap, **kwargs):
        pass


# -----------------------------------------------------------------------------
# ProxyManager
# -----------------------------------------------------------------------------
# A ProxyManager needs to load some definitions in order to be able to create
# proxies which will hold a set of values in their properties.
# A proxy state can then be used to control a concrete object that can be
# local or remote.
# Proxies provide a nice infrastructure to map a UI to their state with
# domains and more.
# The ProxyManager is responsible for keeping track of proxies lifecycle and
# finding them from their Id or Tags.
# -----------------------------------------------------------------------------
class ProxyManager:
    """Proxy Manager from model definition"""

    __id_generator = create_id_generator("pxm_")

    def __init__(self, object_factory=None):
        self._id = next(ProxyManager.__id_generator)

        self._mtime = 1
        self._listeners = set()
        self._life_cycle_listeners = set()
        self._obj_factory = object_factory

        self._model_definition = {}
        self._id_map = {}
        self._tag_map = {}
        self.dirty_ids = set()

    @property
    def id(self):
        """Return manager id"""
        return self._id

    @property
    def mtime(self):
        """Return current global modified time"""
        return self._mtime

    def modified(self):
        """Create a modified event and bump global mtime"""
        self._life_cycle("before_modified", mtime=self._mtime)
        self._mtime += 1
        self._life_cycle("after_modified", mtime=self._mtime)
        return self._mtime

    def _apply_mixin(self, *names):
        """Internal helper to decorate definition using some composition logic"""
        if len(names) == 0:
            names = self._model_definition.keys()

        for name in names:
            if name.startswith("_"):
                continue
            object_definition = self._model_definition.get(name, {})
            mixins = object_definition.get("_mixins", [])
            for mixin_name in mixins:
                mixin = self._model_definition.get(mixin_name, {})
                object_definition.update(mixin)

    # -------------------------------------------------------------------------
    # Event handling
    # -------------------------------------------------------------------------

    def _life_cycle(self, cycle, **kwargs):
        """Call lyfe cycle listeners"""
        for listener in self._life_cycle_listeners:
            getattr(listener, cycle)(**kwargs)

    def add_life_cycle_listener(self, listener: ProxyManagerLifeCycleListener):
        """Register life cycle listener"""
        listener.set_proxymanager(self)
        self._life_cycle_listeners.add(listener)

    def remove_life_cycle_listener(self, listener: ProxyManagerLifeCycleListener):
        """Unregister life cycle listener"""
        listener.set_proxymanager(None)
        self._life_cycle_listeners.discard(listener)

    def _emit(self, topic, **kwargs):
        for listener in self._listeners:
            listener(topic, **kwargs)

    def on(self, fn_callback):
        """
        Register callback when something is changing in ProxyManager.

        fn(topic, **kwars)
        => topic='created' | ids=[]
        => topic='changed' | ids=[]
        => topic='deleted' | ids=[]
        => topic='commit' | ids=[]
        => topic='reset' | ids=[]
        """
        self._listeners.add(fn_callback)

    def off(self, fn_callback):
        """
        Unregister attached function/method
        """
        self._listeners.discard(fn_callback)

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
            self._life_cycle("before_load_model", definition=add_on_dict)
            self._model_definition.update(add_on_dict)
            self._apply_mixin(*add_on_dict.keys())
            self._life_cycle("after_load_model", definition=yaml_content)
            return True

        return False

    def get_definition(self, obj_type):
        """Return a loaded definition for a given object_type"""
        return self._model_definition[obj_type]

    def types(self, *with_tags):
        """List proxy_types from definition that has the set of provided tags"""
        result = []
        tag_filter = set(with_tags)
        for type_name in self._model_definition.keys():
            has_tag = set(self._model_definition[type_name].get("_tags", []))
            if tag_filter.issubset(has_tag):
                result.append(type_name)

        return result

    # -------------------------------------------------------------------------
    # Proxy management
    # -------------------------------------------------------------------------

    def create(self, proxy_type, **initial_values):
        """
        Create a new instance of a proxy using an proxy_type along with
        maybe a set of property values that we want to pre-initialise using the
        **kwargs approach.
        """

        # Can't create object if no definition available
        if proxy_type not in self._model_definition:
            raise ValueError(
                f"Object of type: {proxy_type} was not found in our loaded model definitions"
            )

        self._life_cycle(
            "proxy_create_before", proxy_type=proxy_type, initial_values=initial_values
        )
        obj = self._obj_factory.create(proxy_type) if self._obj_factory else None
        proxy = Proxy(self, proxy_type, obj, **initial_values)
        self._life_cycle(
            "proxy_create_before_commit",
            proxy_type=proxy_type,
            initial_values=initial_values,
            proxy=proxy,
        )

        proxy.commit()
        self._life_cycle(
            "proxy_create_after_commit",
            proxy_type=proxy_type,
            initial_values=initial_values,
            proxy=proxy,
        )

        self._emit("created", ids=[proxy.id])

        return proxy

    def delete(self, proxy_id, trigger_modified=True):
        """
        Delete object along with its dependency that it is owner of
        """
        self._life_cycle(
            "proxy_delete_before", proxy_id=proxy_id, trigger_modified=trigger_modified
        )
        before_delete = set(self._id_map.keys())
        # Delete ourself
        proxy_to_delete: Proxy = self._id_map[proxy_id]
        del self._id_map[proxy_id]
        for tag in proxy_to_delete.tags:
            self._tag_map.get(tag).discard(proxy_id)

        self._life_cycle(
            "proxy_delete_after_self",
            proxy_id=proxy_id,
            trigger_modified=trigger_modified,
            proxy=proxy_to_delete,
        )

        # Delete objects that we own
        for _id in proxy_to_delete.own:
            self.delete(_id, False)

        self._life_cycle(
            "proxy_delete_after_own",
            proxy_id=proxy_id,
            trigger_modified=trigger_modified,
            proxy=proxy_to_delete,
        )

        if trigger_modified:
            after_delete = set(self._id_map.keys())
            self.modified()
            self._emit("deleted", ids=list(before_delete.difference(after_delete)))

    def get(self, proxy_id: str) -> Proxy:
        """
        return proxy instance
        """
        return self._id_map.get(proxy_id, None)

    def update(self, change_set):
        """
        changeSet = [
            { id: 2143, name: 'Origin', value: [0, 1, 3] },
            ...
        ]
        """
        self._life_cycle("proxy_update_before", change_set=change_set)
        dirty_ids = set()
        for change in change_set:
            _id = change["id"]
            _name = change["name"]
            _value = change["value"]
            dirty_ids.add(_id)
            proxy: Proxy = self.get(_id)
            proxy.set_property(_name, _value)

        self._life_cycle(
            "proxy_update_after", change_set=change_set, dirty_ids=dirty_ids
        )
        self._emit("changed", ids=list(dirty_ids))

    def get_instances_of_type(self, proxy_type):
        """
        Return all the instances of the given type
        """
        result = []
        for proxy in self._id_map.values():
            if proxy.type == proxy_type:
                result.append(proxy)

        return result

    def tags(self, *args):
        """List all instances containing all the listed tags"""
        selected_ids = set(self._id_map.keys())
        for tag in args:
            if tag in self._tag_map:
                selected_ids &= self._tag_map[tag]
            else:
                return []

        result = []
        for obj_id in selected_ids:
            result.append(self._id_map[obj_id])

        return result

    # -------------------------------------------------------------------------
    # Import / Export
    # -------------------------------------------------------------------------

    def save(self, file_output=None):
        """Export state (definition+data) into a file"""
        self._life_cycle("export_before", file_output=file_output)
        data = {
            "model": self._model_definition,
            "proxies": [proxy.state for proxy in self._id_map.values()],
        }
        self._life_cycle("export_after", file_output=file_output, data=data)
        if file_output:
            with open(file_output, "w") as outfile:
                json.dump(data, outfile)
        else:
            return json.dumps(data)

    def load(self, file_input=None, file_content=None):
        """Load previously exported state from a file"""
        self._life_cycle(
            "import_before", file_input=file_input, file_content=file_content
        )
        if file_input:
            with open(file_input) as json_file:
                data = json.load(json_file)
        else:
            data = json.loads(file_content)

        self._life_cycle(
            "import_before_processing",
            file_input=file_input,
            file_content=file_content,
            data=data,
        )

        self._model_definition.update(data["model"])

        # Create proxies
        _id_remap = {}
        _new_ids = []
        for proxy_state in data["proxies"]:
            _id = proxy_state["id"]
            _type = proxy_state["type"]
            _proxy = self.create(_type)
            _id_remap[_id] = _proxy.id
            _proxy.state = proxy_state
            _new_ids.append(_proxy.id)

        # Remap ids
        for new_id in _new_ids:
            _proxy = self.get(new_id)
            _proxy.remap_ids(_id_remap)
            _proxy.commit()

        self._life_cycle(
            "import_after",
            file_input=file_input,
            file_content=file_content,
            data=data,
            new_ids=_new_ids,
            id_remap=_id_remap,
        )
        self._emit("created", ids=_new_ids)

    # -------------------------------------------------------------------------
    # Commit / Reset
    # -------------------------------------------------------------------------

    def commit_all(self):
        """Commit all dirty proxies"""
        dirty_ids = list(self.dirty_ids)
        for _id in dirty_ids:
            proxy = self.get(_id)
            if proxy:
                proxy.commit()
        self._emit("commit", ids=dirty_ids)

    def reset_all(self):
        """Reset all dirty proxies"""
        dirty_ids = list(self.dirty_ids)
        for _id in dirty_ids:
            proxy = self.get(_id)
            if proxy:
                proxy.reset()
        self._emit("reset", ids=dirty_ids)


# -----------------------------------------------------------------------------
# UIManager
# -----------------------------------------------------------------------------
# A UIManager is responsible to map a UI to proxy properties with the help
# of a resolver which is specialized to the target environment (Qt, Web)
# -----------------------------------------------------------------------------
class UIManager:
    """UI Manager provide UI information to edit and input object properties"""

    id_generator = create_id_generator()

    def __init__(self, proxymanager, ui_resolver):
        self._id = next(UIManager.id_generator)
        self._pxm = proxymanager
        self._ui_resolver = ui_resolver
        self._ui_xml = {}
        self._ui_lang = {}
        self._ui_resolved = {}
        # event handling
        self._listeners = set()

    @property
    def id(self):
        """Return Manager id"""
        return f"{self._pxm.id}:{self._id}"

    @property
    def proxymanager(self):
        """Return linked proxy manager"""
        return self._pxm

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
            auto_ui = ui.extract_ui(yaml_content)
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
        for listener in self._listeners:
            listener(topic, **kwargs)

    def on(self, fn_callback):
        """
        Register callback when something is changing in ObjectManager.

        fn(topic, **kwars)
        => topic='ui'
        => topic='lang'
        => topic='lang+ui'
        """
        self._listeners.add(fn_callback)

    def off(self, fn_callback):
        """
        Unregister callback
        """
        self._listeners.discard(fn_callback)

    # -------------------------------------------------------------------------
    # UI handling
    # -------------------------------------------------------------------------

    def data(self, proxy_id):
        """Return proxy state to fill UI with"""
        _proxy = self._pxm.get(proxy_id)
        if _proxy:
            return _proxy.state

        print(f"UIManager::data({proxy_id}) => No proxy")
        return None

    def ui(self, _type):
        """Return resolved layout"""
        if _type in self._ui_resolved:
            return self._ui_resolved[_type]

        model_def = self._pxm.get_definition(_type)
        lang_def = self._ui_lang[_type]
        ui_def = self._ui_xml[_type]
        resolved = self._ui_resolver.resolve(model_def, lang_def, ui_def)
        resolved = resolved.decode("UTF-8")
        self._ui_resolved[_type] = resolved

        return resolved


# ----------------------------------------------------------------------------
# ObjectFactory
# ----------------------------------------------------------------------------
# The ObjectFactory is responsible for the creation of concrete object that
# a given proxy can control.
# ----------------------------------------------------------------------------
class ObjectFactory:
    """Concrete object helper"""

    def __init__(self):
        self._map = {}

    def register(self, name, klass):
        """Register constructor to match definition type"""
        self._map[name] = klass

    def create(self, name, **kwargs):
        """Try to create concreate oject"""
        obj = None
        if name in self._map:
            obj = self._map[name](**kwargs)

        if name in globals():
            obj = globals()[name](**kwargs)

        if obj is None:
            print("Could not instantiate", name)

        return obj


# -----------------------------------------------------------------------------
# DomainManager
# -----------------------------------------------------------------------------
# A DomainManager can optionally be linked to a ProxyManager to handle
# Domains life cycle and provide validation and/or guidance on how to set values
# to the properties of a proxy.
# This enable domain to set initial values and let UIManager to provide
# additional informations to the client for error checking and listing
# available values for drop down and else.
# -----------------------------------------------------------------------------
class ProxyDomainManager(ProxyManagerLifeCycleListener):
    def __init__(self):
        self._id_map = {}
        self._dirty_ids = set()

    def is_dirty(self, _id):
        return _id in self._dirty_ids

    def clean(self, *_ids):
        for _id in _ids:
            self._dirty_ids.discard(_id)

    def dirty(self, *_ids):
        for _id in _ids:
            self._dirty_ids.add(_id)

    def dirty_ids(self):
        return _DirtyDomainsResources(self, self._dirty_ids)

    def get(self, _id):
        return self._id_map.get(_id)

    def proxy_create_before_commit(self, proxy_type, initial_values, proxy, **kwargs):
        pd = ProxyDomain(proxy, self)
        self._id_map[proxy.id] = pd
        while pd.apply():
            pass
            # print("domain::apply(create)", proxy.id)

    def proxy_delete_before(self, proxy_id, trigger_modified, **kwargs):
        del self._id_map[proxy_id]

    def apply_all(self):
        results = {}
        with self.dirty_ids() as ids:
            for id in ids:
                results[id] = self.get(id).apply()
        return results


class _DirtyDomainsResources(set):
    def __init__(self, pdm, dirty_set):
        super().__init__(dirty_set)
        self._pdm = pdm

    def __enter__(self):
        self._pdm._dirty_ids.clear()
        return self

    def __exit__(self, exc_type, exc_value, exc_traceback):
        pass


###############################################################################
# Operators
###############################################################################

# -----------------------------------------------------------------------------
# Value validator
# -----------------------------------------------------------------------------
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
    if isinstance(v, ObjectValue):
        return True

    return False


# -----------------------------------------------------------------------------
# Move proxy property onto the object the proxy is controlling
# -----------------------------------------------------------------------------
def push(proxy: Proxy):
    obj_id = proxy.id
    obj = proxy.object
    pxm = proxy.manager
    obj_def = proxy.definition
    change_count = 0

    if hasattr(obj, "GetMTime"):
        change_count = obj.GetMTime()

    for name in proxy.edited_property_names:
        value = proxy[name]
        if isinstance(value, Proxy):
            value = value.object if value else None
        elif value is None:
            continue

        if "_set" in obj_def.get(name, ""):
            # custom setter handling
            actions = obj_def.get(name).get("_set")
            for action in actions:
                method_name = action.get("method", None)
                filter = action.get("filter", None)
                kwargs = action.get("kwargs", {})
                if filter:
                    filters.__dict__[filter](pxm, obj_id, name, method_name, **kwargs)
                else:
                    getattr(obj, method_name)(**kwargs)
        elif hasattr(obj, f"set{name}"):
            fn = getattr(obj, f"set{name}")
            if fn(value):
                change_count += 1
        elif hasattr(obj, f"Set{name}"):
            fn = getattr(obj, f"Set{name}")
            if fn(value):
                change_count += 1

    if hasattr(obj, "GetMTime"):
        new_mtime = obj.GetMTime()
        change_count = 1 if (change_count < new_mtime) else 0

    return change_count


# -----------------------------------------------------------------------------
# Update properties by reading values from the object the proxy is controlling
# -----------------------------------------------------------------------------
def fetch(proxy: Proxy, names=[], fetch_all=False):
    if proxy:
        obj = proxy.object
        obj_def = proxy.definition
        props_updated = []
        if len(names) == 0:
            names = obj_def.keys()
        for name in names:
            if name.startswith("_"):
                continue
            prop_def = obj_def.get(name, {})
            if "_get" in prop_def:
                if prop_def.get("_get") == "skip":
                    continue
                else:
                    print(prop_def)
                    raise ValueError(
                        "Not sure how to handle read from custom method/filter"
                    )
            elif "initial" in prop_def:
                # We should not pull if initial is defined
                continue
            else:
                known_value = proxy[name]
                read_value = known_value

                for fn_name in [f"Get{name}", f"get{name}"]:
                    if hasattr(obj, fn_name):
                        fn = getattr(obj, fn_name)
                        read_value = fn()
                        break

                if known_value != read_value and is_valid_value(read_value):
                    props_updated.append(name)
                    proxy.set_property(name, read_value)

        # Fetch sub-proxy
        if fetch_all:
            for _id in proxy.own:
                fetch(proxy.manager.get(_id))

        change_detected = len(props_updated) > 0
        return change_detected, props_updated
