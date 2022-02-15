from simput.core import ObjectValue, Proxy, PropertyDomain, ProxyDomain, ProxyManager
from simput import handlers

# -----------------------------------------------------------------------------
# Domains types
# -----------------------------------------------------------------------------
# Domains aim to set initial value and guide the user on how to enter certain
# values with hint or validation.
# -----------------------------------------------------------------------------
# - ProxyBuilder: Create proxy for a property
# - IsEqual: Create condition that can then be used in UI visibility
# - FieldSelector: Select array for a given property
# - Range: Compute min/max/mean of a given array range
# - BoundsCenter: Compute center using bounds of algo, ds, bounds
# - ResetOnChange: Use to reset other domain for default value computation
# - LabelList: Static list of text/value pair
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# ProxyBuilder
# -----------------------------------------------------------------------------
#  type: ProxyBuilder        | select this domain
#  initial: xyz              | set name=xyz proxy to the property as default
#  values:                   | list all possible proxy that can be set
#    - name: xyz             | proxy entry: - name
#      type: Representation  |              - proxy type
#  bind: Input               | set self to SubProxy.Input property (optional)
# -----------------------------------------------------------------------------
class ProxyBuilder(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self._message = "ProxyBuilder"
        self._items = kwargs.get("values", [])
        self._selection = kwargs.get("initial", None)
        self._proxy_map = {}
        _bind = kwargs.get("bind", None)
        pxm: ProxyManager = _proxy.manager
        _tags = [f"{_proxy.id}::{_property}"]
        _ids = []
        for item in self._items:
            _name = item.get("name")
            _type = item.get("type")
            _init = {}
            if _bind:
                _init[_bind] = _proxy
            sub_proxy = pxm.create(_type, _name=_name, _tags=_tags, **_init)
            _ids.append(sub_proxy.id)
            self._proxy_map[_name] = sub_proxy

        _proxy.own = _ids

    def set_value(self):
        if self._should_compute_value:
            self.value = self._proxy_map[self._selection]
            self._should_compute_value = False
            return True
        return False

    def available(self):
        return [
            {"text": item.get("name"), "value": self._proxy_map[item.get("name")].id}
            for item in self._items
        ]

    def valid(self, required_level=2):
        if self._level < required_level:
            return True

        v = self.value
        for item in self._items:
            if item.get("name", None) == v:
                return True
        return False

    def hints(self):
        if not self.valid(0):
            return [
                {
                    "level": self._level,
                    "message": self._message,
                    "value": self.value.id if self.value else None,
                    "allowed": self._items,
                }
            ]
        return []


# -----------------------------------------------------------------------------
# IsEqual
# -----------------------------------------------------------------------------
#  type: IsEqual          | select this domain
#  name: Scalars          | (optional) provide another name than its type
#  available: {type/name} | Which domain available list on prop to use
#  value: Scalar          | Value that our prop needs to match to be "valid"
# -----------------------------------------------------------------------------
class IsEqual(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self._available = kwargs.get("available", "")
        self._value = kwargs.get("value", "")
        self._message = "IsEqual"

    def valid(self, required_level=2):
        _v = self.value.id if isinstance(self.value, Proxy) else self.value
        pxd = self._proxy_domain_manager.get(self._proxy.id)
        domain = pxd.get_property_domains(self._property_name).get(self._available)
        _available = domain.available()

        if _v == self._value:
            return True

        for item in _available:
            if item.get("value") == _v and item.get("text") == self._value:
                return True

        return False


# -----------------------------------------------------------------------------
# FieldSelector
# -----------------------------------------------------------------------------
#  name: List           | (optional) provide another name than its type
#  type: FieldSelector  | select this domain
#  input: Input         | Specify property on which field inspection happen
#  location: Point      | Filtering arrays to be only on [Point/Cell/Field]
#  size: 1              | Number of components for available arrays
#  initial: first       | (optional) if provided, domain will set array to prop
#  isA:                 | (optional) filter arrays by their type
#    - vtkDataArray     |   => Only numerical arrays
# -----------------------------------------------------------------------------
class FieldSelector(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self.__input_prop_name = kwargs.get("input", "self")
        self.__input_port = kwargs.get("port", 0)
        self.__array_location = kwargs.get("location", "Point")
        self.__array_components = kwargs.get("size", 1)
        self.__array_types = kwargs.get("isA", [])
        self.__value_obj = _proxy.definition[_property].get("type", "") == "object"
        self._message = "FieldSelector"

    def set_value(self):
        if self._should_compute_value:
            all_arrays = self.available()
            if len(all_arrays):
                if self.__value_obj:
                    _input_proxy = None
                    if self.__input_prop_name == "self":
                        _input_proxy = self._proxy
                    else:
                        _input_proxy = self._proxy[self.__input_prop_name]
                    array_info = all_arrays[0]
                    _state = {
                        "type": "Array",
                        "source": _input_proxy.id,
                        "port": array_info.get("port", 0),
                        "location": array_info.get("location", "Point"),
                        "name": array_info.get("name", 0),
                        "components": array_info.get("components", 1),
                    }
                    if self.value:
                        self.value.state = _state
                    else:
                        self.value = ObjectValue.create(_state)
                else:
                    self.value = all_arrays[0].get("value")
                self._should_compute_value = False
                return True
        return False

    def available(self):
        arrays = self.get_fields()
        result = []
        for array in arrays:
            result.append(
                {
                    # ui data
                    "text": array.GetName(),
                    "value": f"{self.__array_location}::{array.GetName()}",
                    # real data
                    "port": self.__input_port,
                    "name": array.GetName(),
                    "location": self.__array_location,
                    "components": array.GetNumberOfComponents(),
                    "type": array.GetClassName(),
                }
            )
        return result

    def valid(self, required_level=2):
        if self._level < required_level:
            return True

        _v = self.value
        _items = self.available()
        for item in _items:
            if item.get("value") == _v:
                return True
        return False

    def get_fields(self):
        _input_proxy = None
        if self.__input_prop_name == "self":
            _input_proxy = self._proxy
        else:
            _input_proxy = self._proxy[self.__input_prop_name]

        if _input_proxy and _input_proxy.object:
            source = _input_proxy.object
            port = self.__input_port
            location = self.__array_location
            size = self.__array_components
            types = self.__array_types
            return handlers.ListArrays.available_arrays(
                source, port, location, size, types
            )

        return []

    def get_field(self):
        if self.value:
            array_name = self.value.name
            for array in self.get_fields():
                if array.GetName() == array_name:
                    return array

        return None


# -----------------------------------------------------------------------------
# Range
# -----------------------------------------------------------------------------
#  name: xxxx                | (optional) provide another name than its type
#  type: Range               | select this domain
# -----------------------------------------------------------------------------
#  value_range: [0, 1]       | Static range
# -----------------------------------------------------------------------------
#  property: PropArray       | Specify property on which an array is defined
#  initial: [mean, min, max] | Computation to use for setting the value
#  component: -1 (mag)       | Component to use for range computation
# -----------------------------------------------------------------------------
class Range(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self.__compute = kwargs.get("initial", "mean")
        self.__prop_array = kwargs.get("property", None)
        self.__range_component = kwargs.get("component", -1)
        self.__static_range = kwargs.get("value_range", False)
        self._message = "Range"

        # Declare dependency
        if self.__prop_array:
            # ic("Range add dep", self.__prop_array)
            self._dependent_properties.add(self.__prop_array)

    def set_value(self):
        if self._should_compute_value:
            data_range = self.get_range(self.__range_component)
            if data_range is None:
                return False

            _v = 0
            if self.__compute == "mean":
                _v = (data_range[0] + data_range[1]) * 0.5
            elif self.__compute == "min":
                _v = data_range[0]
            elif self.__compute == "max":
                _v = data_range[1]
            else:
                print(
                    f"Range domain can't compute {self.__compute}. Expect 'mean', 'min' or 'max' instead."
                )

            prop_size = self._proxy.definition.get(self._property_name).get("size", 1)
            if prop_size == -1:
                self.value = [_v]
            elif prop_size > 1:
                if self.value and isinstance(self.value, list):
                    if len(self.value):
                        self.value[0] = _v
                    else:
                        self.value.append(_v)
                else:
                    self.value = [_v]
            else:
                self.value = _v

            self._should_compute_value = False
            return True
        return False

    def available(self):
        return self.get_range(self.__range_component)

    def valid(self, required_level=2):
        if self._level < required_level:
            return True

        _v = self.value
        if _v is None:
            self._message = (
                f"Undefined value can not be evaluated in {self.available()}"
            )
            return False

        _range = self.available()
        self._message = f"Value outside of {_range}"
        if isinstance(_v, list):
            _valid = True
            for __v in _v:
                if __v is None:
                    continue
                if _range[0] is not None and __v < _range[0]:
                    _valid = False
                if _range[1] is not None and __v > _range[1]:
                    _valid = False
            return _valid

        lower = _range[0] is None or _v >= _range[0]
        upper = _range[1] is None or _v <= _range[1]
        return lower and upper

    def get_range(self, component=-1):
        if self.__static_range:
            return self.__static_range

        # Get array from FieldSelector
        _proxy_domains = self._proxy_domain_manager.get(self._proxy.id)
        if _proxy_domains:
            _prop_domains = _proxy_domains.get_property_domains(self.__prop_array)
            for domain in _prop_domains.values():
                if isinstance(domain, FieldSelector):
                    field = domain.get_field()
                    if field:
                        return field.GetRange(component)

        return None


# -----------------------------------------------------------------------------
# ResetOnChange
# -----------------------------------------------------------------------------
#  name: xxxx                | (optional) provide another name than its type
#  type: ResetOnChange       | select this domain
# -----------------------------------------------------------------------------
#  property: Property name   | When current property change reset domain on
#  domain: Domain name/type  | property so default values could be regenerated
# -----------------------------------------------------------------------------
class ResetOnChange(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self.__prop_name = kwargs.get("property", None)
        self.__domain_type = kwargs.get("domain", None)
        self.__last_value = None

    def set_value(self):
        if self.__last_value != self.value:
            self.__last_value = self.value

            proxy_domains = self._proxy_domain_manager.get(self._proxy.id)

            if not proxy_domains:
                return False

            change_count = 0
            prop_domains = proxy_domains.get_property_domains(self.__prop_name)
            if self.__domain_type and self.__domain_type in prop_domains:
                prop_domains[self.__domain_type].enable_set_value()
            else:
                for domain in prop_domains.values():
                    domain.enable_set_value()

            for domain in prop_domains.values():
                change_count += domain.set_value()

            return change_count
        return False


# -----------------------------------------------------------------------------
# BoundsCenter
# -----------------------------------------------------------------------------
#  name: xxxx                | (optional) provide another name than its type
#  type: BoundsCenter        | select this domain
# -----------------------------------------------------------------------------
#  proxy: Property name containing data object proxy
#  property: Property on Proxy that is the data object
# -----------------------------------------------------------------------------
class BoundsCenter(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self._dataset_path = kwargs.get("dataset", [])
        # Always use to set initial value
        self._need_set = True
        self._should_compute_value = True

    def set_value(self):
        if self._should_compute_value:
            # Get bounds
            _ds = self._proxy
            for next in self._dataset_path:
                if _ds is None:
                    return False
                _ds = _ds[next]

            _bounds = None
            if _ds and _ds.object:
                _bounds = handlers.BoundsExtractor.evaluate(_ds.object)

            _center = None
            if _bounds:
                _center = handlers.BoundsCenter.evaluate(_bounds)

            if _center:
                self._should_compute_value = False
                self.value = _center
                return True

        return False


# -----------------------------------------------------------------------------
# LabelList
# -----------------------------------------------------------------------------
#  name: xxxx                | (optional) provide another name than its type
#  type: LabelList           | select this domain
# -----------------------------------------------------------------------------
#  values: [{ text, value}, ...]
# -----------------------------------------------------------------------------
class LabelList(PropertyDomain):
    def __init__(self, _proxy: Proxy, _property: str, _domain_manager=None, **kwargs):
        super().__init__(_proxy, _property, _domain_manager, **kwargs)
        self._values = kwargs.get("values", [])
        self._message = "LabelList"

    def set_value(self):
        if self._should_compute_value and self._values:
            self._should_compute_value = False
            # first
            self.value = self._values[0].get("value")
            return True
        return False

    def available(self):
        return self._values

    def valid(self, required_level=2):
        if self._level < required_level:
            return True

        v = self.value
        for item in self._values:
            if item.get("value", None) == v:
                return True
        return False


# -----------------------------------------------------------------------------
# Registration
# -----------------------------------------------------------------------------


def register_domains():
    ProxyDomain.register_property_domain("ProxyBuilder", ProxyBuilder)
    ProxyDomain.register_property_domain("IsEqual", IsEqual)
    ProxyDomain.register_property_domain("FieldSelector", FieldSelector)
    ProxyDomain.register_property_domain("Range", Range)
    ProxyDomain.register_property_domain("ResetOnChange", ResetOnChange)
    ProxyDomain.register_property_domain("BoundsCenter", BoundsCenter)
    ProxyDomain.register_property_domain("LabelList", LabelList)
