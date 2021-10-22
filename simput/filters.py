# Filters are like SIProperty
# from icecream import ic


def location_to_field_association(loc):
    if loc == "Point":
        return 0
    if loc == "Cell":
        return 1
    if loc == "Field":
        return 3

    return 4


def to_output_port(pxm, obj_id, prop_name, method_name, port=0, connection=0, **kwargs):
    _proxy = pxm.get(obj_id)
    _input = _proxy[prop_name].object
    print(f"{method_name}({_input.GetClassName()}.GetOutputPort({port}))")
    getattr(_proxy.object, method_name)(connection, _input.GetOutputPort(port))


def to_input_array_to_process(
    pxm, obj_id, prop_name, method_name, idx=0, connection=0, port=0, **kwargs
):
    # ic("to_input_array_to_process", prop_name)
    _proxy = pxm.get(obj_id)
    prop_value = _proxy[prop_name]
    if not prop_value:
        return

    if isinstance(prop_value, str):
        _location, _name = prop_value.split("::")
    else:
        _location, _name = prop_value.state.split("::")

    method_params = [
        idx,
        int(port),
        connection,
        location_to_field_association(_location),
        _name,
    ]
    fn = getattr(_proxy.object, method_name)
    print(f"{method_name}({method_params})")
    fn(*method_params)


r"""
Filters will call a method while interpreting the prop value in a way
that it make it compatible with the method profile.
"""


def to_size(pxm, obj_id, prop_name, method_name, **kwargs):
    _proxy = pxm.get(obj_id)
    prop_value = _proxy[prop_name]
    size = 0
    if isinstance(prop_value, list):
        size = len(prop_value)
    print(f"{method_name}({size})")
    getattr(_proxy.object, method_name)(size)


def map_index_value(pxm, obj_id, prop_name, method_name, start_index=0, **kwargs):
    _proxy = pxm.get(obj_id)
    prop_values = _proxy[prop_name]
    fn = getattr(_proxy.object, method_name)
    index = start_index
    if not isinstance(prop_values, list):
        prop_values = [prop_values]

    print("map_index_value::prop_values", prop_values)
    for value in prop_values:
        print(f"{method_name}({index}, {value})")
        fn(index, value)
        index += 1
