# Filters are like SIProperty


def location_to_field_association(loc):
    if loc == "Point":
        return 0
    if loc == "Cell":
        return 1
    if loc == "Field":
        return 3

    return 4


def to_output_port(
    object_manager, obj_id, prop_name, method_name, port=0, connection=0, **kwargs
):
    prop_value = object_manager.get(obj_id).get("properties").get(prop_name)
    prop_obj = object_manager.get_object(prop_value)
    obj = object_manager.get_object(obj_id)
    print(f"{method_name}({prop_obj.GetClassName()}.GetOutputPort({port}))")
    getattr(obj, method_name)(connection, prop_obj.GetOutputPort(port))


def to_input_array_to_process(
    object_manager, obj_id, prop_name, method_name, idx=0, connection=0, **kwargs
):
    prop_value = object_manager.get(obj_id).get("properties").get(prop_name)
    if not prop_value:
        return

    _port, _location, _name = prop_value.split("::")
    obj = object_manager.get_object(obj_id)
    method_params = [
        idx,
        int(_port),
        connection,
        location_to_field_association(_location),
        _name,
    ]
    fn = getattr(obj, method_name)
    print(f"{method_name}({method_params})")
    fn(*method_params)

r"""
Filters will call a method while interpreting the prop value in a way
that it make it compatible with the method profile.
"""


def to_size(object_manager, obj_id, prop_name, method_name, **kwargs):
    prop_value = object_manager.get(obj_id).get("properties").get(prop_name)
    size = 0
    if isinstance(prop_value, list):
        size = len(prop_value)
    obj = object_manager.get_object(obj_id)
    print(f"{method_name}({size})")
    getattr(obj, method_name)(size)


def map_index_value(
    object_manager, obj_id, prop_name, method_name, start_index=0, **kwargs
):
    prop_values = object_manager.get(obj_id).get("properties").get(prop_name)
    obj = object_manager.get_object(obj_id)
    fn = getattr(obj, method_name)
    index = start_index
    if not isinstance(prop_values, list):
        prop_values = [prop_values]

    print("map_index_value::prop_values", prop_values)
    for value in prop_values:
        print(f"{method_name}({index}, {value})")
        fn(index, value)
        index += 1
