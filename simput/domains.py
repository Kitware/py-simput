from simput.core import Proxy, Domain, ProxyManager, ProxyManagerDecorator

from icecream import ic

# -----------------------------------------------------------------------------
# Domain Decorator for ProxyManager
# -----------------------------------------------------------------------------
# This enable domain to set initial values and let UIManager to provide
# additional informations to the client for error checking and listing
# available values for drop down and else.
# -----------------------------------------------------------------------------
class DomainBehavior(ProxyManagerDecorator):
    def __init__(self):
        self._id_map = {}

    def constraints(self, _id):
        output = {}
        domains = self._id_map.get(_id, {})
        for prop_name, prop_domains in domains.items():
            prop_info = {}
            hints = []

            for domain_name, domain_inst in prop_domains.items():
                available = domain_inst.available()
                if available:
                    prop_info[domain_name] = { "available": available }

            if prop_info or hints:
                prop_info["hints"] = hints
                output[prop_name] = prop_info

        return output

    def proxy_create_before_commit(self, proxy_type, initial_values, proxy, **kwargs):
        domains = Domain.create(proxy)
        self._id_map[proxy.id] = domains

    def proxy_delete_before(self, proxy_id, trigger_modified, **kwargs):
        del self._id_map[proxy_id]

    # def proxy_update_before(self, change_set, **kwargs):
    #     for change in change_set:
    #         _id = change["id"]
    #         _name = change["name"]
    #         _value = change["value"]
    #         _domains = self._id_map.get(_id, None)
    #         if _domains and _name in _domains:
    #             _prop_domains = _domains[_name]
    #             for _domain in _prop_domains:
    #                 _value = _domain.validate(_value)

    #             # Clean value from changeset
    #             change["value"] = _value

# -----------------------------------------------------------------------------
# Domains types
# -----------------------------------------------------------------------------
# Domains aim to set initial value and guide the user on how to enter certain
# values with hint or validation.
# -----------------------------------------------------------------------------
class ProxyBuilder(Domain):
    def __init__(self, proxy: Proxy, property: str, **kwargs):
        super().__init__(proxy, property, **kwargs)
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
# Registration
# -----------------------------------------------------------------------------
Domain.register("ProxyBuilder", ProxyBuilder)
