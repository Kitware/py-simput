from simput import handlers

# =============================================================================
# https://docs.djangoproject.com/en/3.2/ref/validators/
#
# Constraints could only have 3 usages:
# - initial:
#     The method has the responsability to compute an initial value for a
#     property and return True if the initialization was successful.
# - is_valid:
#     The method should return true if the current property value respect
#     the defined constraints.
# - available:
#     The method will list the available values or the proper set of
#     informations to compute locally what are the available values.
# =============================================================================


def is_valid(
    object_manager, obj, property_name, constrain_definition, constraints=None
):
    ctype = constrain_definition["type"]
    return globals()[ctype].is_valid(
        object_manager,
        obj,
        obj["properties"][property_name],
        **constrain_definition,
        constraints=constraints,
    )


# -----------------------------------------------------------------------------


def available(object_manager, obj, constrain_definition, constraints=None):
    ctype = constrain_definition["type"]
    return globals()[ctype].available(
        object_manager, obj, **constrain_definition, constraints=constraints
    )


# -----------------------------------------------------------------------------

EPSILON = 1e-6

# =============================================================================
# Constraints
# =============================================================================


class Min:
    @staticmethod
    def is_valid(
        _object_manager, _obj, _value, value=0, exclusive=True, field=None, **kwargs
    ):
        if _value is None:
            return False

        min_value = value
        if field:
            min_value, max_value = handlers.FieldRangeHandler.evaluate(
                _object_manager, _obj, field
            )

        if exclusive:
            return min_value < _value

        return min_value <= _value

    @staticmethod
    def available(_object_manager, _obj, value=0, exclusive=True, field=None, **kwargs):
        min_value = value
        if field:
            min_value, max_value = handlers.FieldRangeHandler.evaluate(
                _object_manager, _obj, field
            )

        if exclusive:
            min_value += EPSILON

        return min_value


# -----------------------------------------------------------------------------


class Max:
    @staticmethod
    def is_valid(
        _object_manager, _obj, _value, value=0, exclusive=True, field=None, **kwargs
    ):
        if _value is None:
            return False

        max_value = value
        if field:
            min_value, max_value = handlers.FieldRangeHandler.evaluate(
                _object_manager, _obj, field
            )

        if exclusive:
            return _value < max_value

        return _value <= max_value

    @staticmethod
    def available(_object_manager, _obj, value=0, exclusive=True, field=None, **kwargs):
        max_value = value
        if field:
            min_value, max_value = handlers.FieldRangeHandler.evaluate(
                _object_manager, _obj, field
            )

        if exclusive:
            max_value -= EPSILON

        return max_value


# -----------------------------------------------------------------------------


class Range:
    @staticmethod
    def initial(self):
        pass

    @staticmethod
    def is_valid(
        _object_manager,
        _obj,
        _value,
        value_range=[0, 1],
        exclusive=True,
        arrayProperty=None,
        **kwargs,
    ):
        if _value is None:
            return False

        if isinstance(_value, list):
            for v in _value:
                if not Range.is_valid(
                    _object_manager,
                    _obj,
                    v,
                    value_range,
                    exclusive,
                    arrayProperty,
                    constraint=None,
                    **kwargs,
                ):
                    return False
            return True

        min_value, max_value = value_range
        if arrayProperty:
            return "local-range"
            min_value, max_value = handlers.FieldRangeHandler.evaluate(
                _object_manager, _obj, field
            )

        # print("min_value", min_value)
        # print("max_value", max_value)
        # print("_value", _value)

        if exclusive:
            return min_value < _value and _value < max_value

        return min_value <= _value and _value <= max_value

    @staticmethod
    def available(
        _object_manager,
        _obj,
        value_range=[0, 1],
        exclusive=True,
        arrayProperty=None,
        arrayConstraint=None,
        **kwargs,
    ):
        min_value, max_value = value_range
        if arrayProperty:
            return {"property": arrayProperty, "constraint": arrayConstraint}
            min_value, max_value = handlers.FieldRangeHandler.evaluate(
                _object_manager, _obj, field
            )

        if exclusive:
            min_value += EPSILON
            max_value -= EPSILON

        return [min_value, max_value]


# -----------------------------------------------------------------------------


class LabelList:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, values=[], **kwargs):
        for item in values:
            if item["value"] == _value:
                return True

        return False

    @staticmethod
    def available(_object_manager, _obj, values=[], **kwargs):
        return values


# -----------------------------------------------------------------------------


class IsA:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, value=None, **kwargs):
        # print("IsA", value, _object_manager.get(_value)["type"])
        return _object_manager.get(_value)["type"] == value

    @staticmethod
    def available(_object_manager, _obj, value=None, **kwargs):
        return _object_manager.get_type(value)


# -----------------------------------------------------------------------------


class PropertyList:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, property=None, **kwargs):
        return _value in _obj["properties"][property]

    @staticmethod
    def available(_object_manager, _obj, property=None, **kwargs):
        # print("PropertyList::available", property)
        return _obj["properties"][property]


# -----------------------------------------------------------------------------


class UI:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, properties={}, **kwargs):
        return properties

    @staticmethod
    def available(_object_manager, _obj, properties={}, **kwargs):
        return []


# -----------------------------------------------------------------------------


class Boolean:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, properties={}, **kwargs):
        return True

    @staticmethod
    def available(_object_manager, _obj, properties={}, **kwargs):
        return [0, 1]


# -----------------------------------------------------------------------------


class HasTags:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, values=[], **kwargs):
        instances_with_tags = _object_manager.tags(*values)
        obj = _object_manager.get(_value)
        return obj in instances_with_tags

    @staticmethod
    def available(_object_manager, _obj, values=[], **kwargs):
        instances_with_tags = _object_manager.tags(*values)
        result = []
        for obj in instances_with_tags:
            if obj == _obj:
                continue
            result.append(
                {
                    "text": obj.get("name", obj.get("type")),
                    "value": obj.get("id"),
                }
            )
        # print("result", result)
        return result


# -----------------------------------------------------------------------------


class ObjectBuilder:
    @staticmethod
    def initial(_object_manager, _obj, _prop_name, _initial_def, _obj_def):
        default_value = _initial_def.get("initial", None)
        values = _initial_def.get("values", None)
        bind_prop = _initial_def.get("bind", None)
        obj_id = _obj.get("id")
        tags = [f"{obj_id}::{_prop_name}"]
        for item in values:
            item_type = item.get("type")
            item_name = item.get("name")
            # print("ObjectBuilder::create", item_type)
            new_obj = _object_manager.create(item_type, _tags=tags, _name=item_name)
            new_obj_id = new_obj.get("id")
            _obj["_obj_deps"].append(new_obj_id)
            if item_name == default_value:
                _obj["properties"][_prop_name] = new_obj_id
                # print("update_object", obj_id, _prop_name, new_obj_id)
                _object_manager.update_object(obj_id, _prop_name)

            if bind_prop:
                new_obj["properties"][bind_prop] = _obj.get("id")
                # print("update_object", new_obj_id, bind_prop, _obj.get('id'))
                _object_manager.update_object(new_obj_id, bind_prop)

                # Try to flush any remaining initial
                while _object_manager._apply_initial(new_obj):
                    pass

        return True

    @staticmethod
    def is_valid(_object_manager, _obj, _value, anchor="", **kwargs):
        tag = f"{_obj.get('id')}::{anchor}"
        instances_with_tags = _object_manager.tags(tag)
        obj = _object_manager.get(_value)
        return obj in instances_with_tags

    @staticmethod
    def available(_object_manager, _obj, anchor="", **kwargs):
        tag = f"{_obj.get('id')}::{anchor}"
        instances_with_tags = _object_manager.tags(tag)
        result = []
        for obj in instances_with_tags:
            if obj == _obj:
                continue
            result.append(
                {
                    "text": obj.get("name", obj.get("type")),
                    "value": obj.get("id"),
                }
            )
        return result


# -----------------------------------------------------------------------------


class RangeMean:
    @staticmethod
    def initial(_object_manager, _obj, _prop_name, _initial_def, _obj_def):
        __property = _initial_def.get("property")
        __constraint = _initial_def.get("constraint")
        __constraint_def = None

        # Find constraint definition
        constraints = _obj_def.get(__property).get("constraints")
        for constraint in constraints:
            cid = constraint.get("name", constraint.get("type"))
            if cid == __constraint:
                __constraint_def = constraint
                break

        if __constraint_def:
            if __constraint_def.get("type") == "FieldSelector":
                selected_value = _obj["properties"][__property]
                options = FieldSelector.available(
                    _object_manager, _obj, **__constraint_def
                )
                for option in options:
                    if option.get("value") == selected_value:
                        _range = option.get("range")
                        _value = (_range[0] + _range[1]) * 0.5
                        if _obj["properties"][_prop_name] != _value:
                            _obj["properties"][_prop_name] = _value

                            print("!" * 80)
                            print(
                                f"! Set RangeMean for {_prop_name} to {_obj['properties'][_prop_name]} from {_range}"
                            )
                            print("!" * 80)

                            return True

                        return False

            else:
                print(
                    f"RangeMean does not know how to handle {__constraint_def.get('type')}"
                )

        return False

    @staticmethod
    def is_valid(_object_manager, _obj, _value, **kwargs):
        return True

    @staticmethod
    def available(_object_manager, _obj, **kwargs):
        return []


# -----------------------------------------------------------------------------


class FieldSelector:
    @staticmethod
    def initial(_object_manager, _obj, _prop_name, _initial_def, _obj_def):
        constraints = _obj_def.get(_prop_name, {}).get("constraints", [])
        for constraint in constraints:
            ctype = constraint.get("type", None)
            if ctype == "FieldSelector":
                source = _object_manager.get_object(
                    _obj.get("properties", {}).get(constraint.get("property", None))
                )
                if source is None:
                    return None

                arrays = handlers.ListArrays.available(
                    source,
                    constraint.get("port", 0),
                    constraint.get("location", ["Points", "Cells", "Fields"]),
                    constraint.get("size", -1),
                    constraint.get("isA", []),
                )

                if len(arrays):
                    new_value = arrays[0].get("value")
                    _obj["properties"][_prop_name] = new_value
                    return True
        return False

    @staticmethod
    def is_valid(_object_manager, _obj, _value, **kwargs):
        return True

    @staticmethod
    def available(
        _object_manager,
        _obj,
        source=None,
        location=["Point", "Cell", "Field"],
        size=-1,
        property="self",
        port=0,
        isA=[],
        **kwargs,
    ):
        # Find source on where to extract that info from
        source = _object_manager.get_object(_obj.get("id"))
        if property != "self":
            source = _object_manager.get_object(_obj.get("properties").get(property))

        # print("available", source, handlers.ListArrays.available(source, port, location, size, isA))

        return handlers.ListArrays.available(source, port, location, size, isA)


# -----------------------------------------------------------------------------


class IsEqual:
    @staticmethod
    def is_valid(_object_manager, _obj, _value, **kwargs):
        return "local-in"

    @staticmethod
    def available(
        _object_manager, _obj, value=None, available="", constraints={}, **kwargs
    ):
        result = []
        available_result = []

        if available:
            for constraint in constraints:
                if available == constraint.get("name", constraint.get("type")):
                    available_result = globals()[constraint.get("type")].available(
                        _object_manager, _obj, **constraint
                    )

        if isinstance(value, list):
            for item in available_result:
                for v in value:
                    if item.get("text") == v:
                        result.append(item.get("value"))
        else:
            for item in available_result:
                if item.get("text") == value:
                    result.append(item.get("value"))

        return result


# -----------------------------------------------------------------------------


class BoundsCenter:
    @staticmethod
    def initial(_object_manager, _obj, _prop_name, _initial_def, _obj_def):
        # print("#"*80)
        # print("# BoundsCenter")
        # print("#"*80)
        # print(_initial_def)
        # print("-"*80)
        # print(_prop_name)
        # print(_obj)
        # print("-"*80)
        obj_props = _obj.get("properties", {})
        src_obj_name = _initial_def.get("object", "Input")
        src_prop_name = _initial_def.get("property", "Input")
        src_obj = _object_manager.get(obj_props.get(src_obj_name))

        # print("src_obj", src_obj)

        if src_obj is None:
            return False

        ds_obj_id = src_obj.get("properties", {}).get(src_prop_name, 0)
        ds_obj = _object_manager.get_object(ds_obj_id)

        if ds_obj:
            bounds = handlers.BoundsExtractor.evaluate(ds_obj)
            center = handlers.BoundsCenter.evaluate(bounds)
            if center is None:
                return False

            print("!" * 80)
            print("!!! Set Center to !!!", center, "from bounds", bounds)
            print("!" * 80)

            _obj["properties"][_prop_name] = center
            return True

        return False
