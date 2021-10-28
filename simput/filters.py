# Filters are like SIProperty
# They are use properly call method to concrete object from property values
# Filters will call a method while interpreting the prop value in a way
# that it make it compatible with the method profile.


def location_to_field_association(loc):
    """Helper to map location to VTK/Enum value"""
    if loc == "Point":
        return 0
    if loc == "Cell":
        return 1
    if loc == "Field":
        return 3

    return 4


def to_output_port(pxm, obj_id, prop_name, method_name, port=0, connection=0, **kwargs):
    """Pipeline binding"""
    _proxy = pxm.get(obj_id)
    _input = _proxy[prop_name].object
    print(f"{method_name}({_input.GetClassName()}.GetOutputPort({port}))")
    getattr(_proxy.object, method_name)(connection, _input.GetOutputPort(port))


def to_input_array_to_process(
    pxm, obj_id, prop_name, method_name, idx=0, connection=0, port=0, **kwargs
):
    """vtkAlgorithm array processing"""
    _proxy = pxm.get(obj_id)
    prop_value = _proxy[prop_name]
    if not prop_value:
        return

    if isinstance(prop_value, str):
        tokens = prop_value.split("::")
        if len(tokens) != 2:
            return
        _location, _name = tokens
    else:
        tokens = prop_value.state.split("::")
        if len(tokens) != 2:
            return
        _location, _name = tokens

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


def to_size(pxm, obj_id, prop_name, method_name, **kwargs):
    """Figure our value size for method call"""
    _proxy = pxm.get(obj_id)
    prop_value = _proxy[prop_name]
    size = 1
    if isinstance(prop_value, list):
        size = len(prop_value)
    print(f"{method_name}({size})")
    getattr(_proxy.object, method_name)(size)


def map_index_value(pxm, obj_id, prop_name, method_name, start_index=0, **kwargs):
    """
    Map a list value to many calls with index:

    value = [x, y, z]
      > obj.SetValue(0, x)
      > obj.SetValue(1, y)
      > obj.SetValue(2, z)
    """
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


def to_bool(pxm, obj_id, prop_name, method_name, **kwargs):
    """Coerce property value to a boolean"""
    _proxy = pxm.get(obj_id)
    fn = getattr(_proxy.object, method_name)
    value = _proxy[prop_name]
    from simput.core import Proxy

    if isinstance(value, Proxy):
        value = value.object if value else None
    print(method_name, value)
    if value:
        fn(True)
    else:
        fn(False)


def to_self(pxm, obj_id, prop_name, method_name, modified=False, **kwargs):
    """Coerce property value to itself of concrete object when proxy"""
    _proxy = pxm.get(obj_id)
    fn = getattr(_proxy.object, method_name)
    value = _proxy[prop_name]
    from simput.core import Proxy

    if isinstance(value, Proxy):
        value = value.object if value else None

    if modified and value:
        value.Modified()

    fn(value)
