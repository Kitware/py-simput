from simput.core import Proxy, Domain, ProxyManager

from icecream import ic

# -----------------------------------------------------------------------------
# Domains types
# -----------------------------------------------------------------------------
# Domains aim to set initial value and guide the user on how to enter certain
# values with hint or validation.
# -----------------------------------------------------------------------------
class ProxyBuilder(Domain):
    def __init__(self, proxy: Proxy, property: str, _domain_manager=None, **kwargs):
        super().__init__(proxy, property, _domain_manager, **kwargs)
        self._items = kwargs.get("values", [])
        self._selection = kwargs.get("initial", None)
        self._proxy_map = {}
        pxm: ProxyManager = proxy.manager
        _tags = [f"{proxy.id}::{property}"]
        for item in self._items:
            _name = item.get("name")
            _type = item.get("type")
            sub_proxy = pxm.create(_type, _name=_name, _tags=_tags)
            proxy.own = sub_proxy
            self._proxy_map[_name] = sub_proxy

    # def validate(self, value):
    #     ic(value)
    #     if value in self._proxy_map:
    #         return self._proxy_map[value].id

    #     if value in self._items:
    #         return self._proxy_map[value.get("name")].id

    #     return value

    def compute_value(self):
        return None

    def set_value(self):
        if self._should_compute_value:
            self.value = self._proxy_map[self._selection]
            self._should_compute_value = False
            return True
        return False

    def available(self):
        return [
            {"text": item.get("name"), "value": self._proxy_map[item.get("name")].id }
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
                    "value": self.value,
                    "allowed": self._items,
                }
            ]
        return []

# -----------------------------------------------------------------------------
class IsEqual(Domain):
    def __init__(self, proxy: Proxy, property: str, _domain_manager=None, **kwargs):
        super().__init__(proxy, property, _domain_manager, **kwargs)
        self._available = kwargs.get("available", "")
        self._value = kwargs.get("value", "")

    def valid(self, required_level=2):
        _v = self.value.id if isinstance(self.value, Proxy) else self.value
        _available = self._domain_manager.available(self._proxy.id, self._property_name, self._available)
        ic("IsEqual:valid", _v, _available, self._value)

        if _v == self._value:
            return True

        for item in _available:
            if item.get("value") == _v and item.get("text") == self._value:
                return True

        return False

# -----------------------------------------------------------------------------
# Registration
# -----------------------------------------------------------------------------

def register_domains():
    Domain.register("ProxyBuilder", ProxyBuilder)
    Domain.register("IsEqual", IsEqual)