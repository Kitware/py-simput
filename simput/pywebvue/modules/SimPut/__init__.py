import os
import json

from wslink import register as exportRpc
from wslink.websocket import LinkProtocol

serve_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "serve"))

# -----------------------------------------------------------------------------
# Basic application setup
# -----------------------------------------------------------------------------

serve = {"__simput": serve_path}
scripts = ["/__simput/vue-simput.umd.js"]
vue_use = ["VueSimput"]

# -----------------------------------------------------------------------------
# Helper classes
# -----------------------------------------------------------------------------

MANAGERS = {}


def get_manager(_id, _type):
    handler = MANAGERS.get(_id, None)
    if handler is None:
        print(f"No manager found for id {_id}")
        return

    return handler.get(_type)


def get_ui_manager(_id):
    return get_manager(_id, "ui_manager")


def get_domains_manager(_id):
    return get_manager(_id, "domains_manager")


# -----------------------------------------------------------------------------


class SimputHelper:
    def __init__(self, app, ui_manager, domains_manager=None, namespace="simput"):
        self._app = app
        self._ui_manager = ui_manager
        self._domains_manager = domains_manager
        self._namespace = namespace
        self._pending_changeset = {}
        self._auto_update = False

        # init keys
        self.id_key = f"{namespace}Id"
        self.changecount_key = f"{namespace}ChangeSet"
        self.changeset_key = f"{namespace}ChangeSetContent"
        self.auto_key = f"{namespace}AutoApply"
        self.apply_key = f"{namespace}Apply"
        self.reset_key = f"{namespace}Reset"
        self.fetch_key = f"{namespace}Fetch"
        self.update_key = f"{namespace}Update"
        self.refresh_key = f"{namespace}Refresh"
        self.reset_cache_key = f"{namespace}ResetCache"

        # Attach annotations
        self._app.set(self.id_key, self._ui_manager.id)
        self._app.set(self.changecount_key, len(self.changeset))
        self._app.set(self.changeset_key, self.changeset)
        self._app.set(self.auto_key, self._auto_update)
        self._app.trigger(self.apply_key)(self.apply)
        self._app.trigger(self.reset_key)(self.reset)
        self._app.trigger(self.fetch_key)(self.push)
        self._app.trigger(self.update_key)(self.update)
        self._app.trigger(self.refresh_key)(self.refresh)
        self._app.trigger(self.reset_cache_key)(self.reset_cache)
        self._app.change(self.auto_key)(self._update_auto)

        # Monitor ui change
        self._ui_manager.on(self._ui_change)
        self._ui_manager.proxymanager.on(self._data_change)

    def __del__(self):
        self._ui_manager.off(self._ui_change)
        self._ui_manager.proxymanager.off(self._data_change)

    @property
    def changeset(self):
        change_set = []
        for obj_id in self._pending_changeset:
            for prop_name in self._pending_changeset[obj_id]:
                value = self._pending_changeset[obj_id][prop_name]
                change_set.append(
                    {
                        "id": obj_id,
                        "name": prop_name,
                        "value": value,
                    }
                )
        return change_set

    def apply(self):
        self._ui_manager.proxymanager.commit_all()

        # Make sure reset don't send things twice
        self._pending_changeset = {}
        self.reset()

    def reset(self):
        ids_to_update = list(self._pending_changeset.keys())
        self._pending_changeset = {}
        self._app.set(self.changecount_key, 0)
        self._app.set(self.changeset_key, [])

        self._ui_manager.proxymanager.reset_all()

        # Go ahead and push changes
        for _id in ids_to_update:
            self.push(id=_id, domains=_id)

    def refresh(self, id=0, property=""):
        if not self._domains_manager:
            return

        proxy_domains = self._domains_manager.get(id)
        if not proxy_domains:
            return

        # Reset
        change_count = 0
        for domain in proxy_domains.get_property_domains(property).values():
            domain.enable_set_value()
            change_count += domain.set_value()

        if change_count:
            with self._domains_manager.dirty_ids() as dirty_ids:
                for _id in dirty_ids:
                    self.push(id=_id)

            if self._auto_update:
                self.apply()

    def reset_cache(self):
        self._app.protocol_call("simput.reset.cache")

    def push(self, id=None, type=None, domains=None):
        if id:
            self._app.protocol_call("simput.data.get", self._ui_manager.id, id)
        if type:
            self._app.protocol_call("simput.ui.get", self._ui_manager.id, type)
        if domains:
            self._app.protocol_call("simput.domains.get", self._ui_manager.id, domains)

    def emit(self, topic, **kwargs):
        self._app.protocol_call("simput.push.event", topic, **kwargs)

    def update(self, change_set):
        for change in change_set:
            _id = change.get("id")
            _name = change.get("name")
            _value = change.get("value")

            if _id not in self._pending_changeset:
                self._pending_changeset[_id] = {}
            _obj_change = self._pending_changeset[_id]

            _obj_change[_name] = _value

        self._app.set(self.changecount_key, len(self.changeset))
        self._app.set(self.changeset_key, self.changeset)

        self._ui_manager.proxymanager.update(change_set)
        if self._domains_manager:
            change_detected = 1
            all_ids = set()
            data_ids = set()

            # Execute domains
            while change_detected:
                change_detected = 0
                with self._domains_manager.dirty_ids() as dirty_ids:
                    all_ids.update(dirty_ids)
                    for _id in dirty_ids:
                        delta = self._domains_manager.get(_id).apply()
                        change_detected += delta
                        if delta:
                            data_ids.add(_id)

            # Push any changed state in domains
            for _id in all_ids:
                self._domains_manager.clean(_id)
                self._app.protocol_call(
                    "simput.message.push",
                    {
                        "id": _id,
                        "domains": self._domains_manager.get(_id).state,
                    },
                )

            for _id in data_ids:
                self._app.protocol_call(
                    "simput.message.push",
                    {
                        "id": _id,
                        "data": self._ui_manager.data(_id),
                    },
                )

        if self._auto_update:
            self.apply()

    @property
    def has_changes(self):
        return len(self._pending_changeset) > 0

    @property
    def auto_update(self):
        return self._auto_update

    @auto_update.setter
    def auto_update(self, value):
        self._auto_update = value
        self._app.set(self.auto_key, value)

    def _update_auto(self):
        value = self._app.get(self.auto_key)
        self.auto_update = value
        if value:
            self.apply()

    def _ui_change(self, *args, **kwargs):
        self.emit("ui-change")

    def _data_change(self, action, **kwargs):
        self.emit("data-change", action=action, **kwargs)


# -----------------------------------------------------------------------------


class SimputProtocol(LinkProtocol):
    def __init__(self):
        super().__init__()
        self.reset_cache()

    @exportRpc("simput.reset.cache")
    def reset_cache(self):
        self.net_cache_domains = {}

    @exportRpc("simput.push")
    def push(self, manager_id, id=None, type=None):
        uim = get_ui_manager(manager_id)
        message = {"id": id, "type": type}
        if id is not None:
            message.update({"data": uim.data(id)})

        if type is not None:
            message.update({"ui": uim.ui(type)})

        self.publish("simput.push", message)

    @exportRpc("simput.data.get")
    def get_data(self, manager_id, id):
        uim = get_ui_manager(manager_id)
        msg = {"id": id, "data": uim.data(id)}
        self.send_message(msg)
        return msg

    @exportRpc("simput.ui.get")
    def get_ui(self, manager_id, type):
        uim = get_ui_manager(manager_id)
        msg = {"type": type, "ui": uim.ui(type)}
        self.send_message(msg)
        return msg

    @exportRpc("simput.domains.get")
    def get_domains(self, manager_id, id):
        msg = {"id": id, "domains": {}}

        domains_manager = get_domains_manager(manager_id)
        if domains_manager:
            domains_manager.clean(id)
            msg["domains"] = domains_manager.get(id).state

        self.send_message(msg)
        return msg

    @exportRpc("simput.message.push")
    def send_message(self, message):
        # Cache domain to prevent network call
        # when not needed. (optional)
        if "domains" in message:
            _id = message.get("id")
            content = self.net_cache_domains.get(_id)
            to_send = json.dumps(message)
            if content == to_send:
                return
            self.net_cache_domains[_id] = to_send
        # - end
        self.publish("simput.push", message)

    @exportRpc("simput.push.event")
    def emit(self, topic, **kwargs):
        event = {"topic": topic, **kwargs}
        self.publish("simput.event", event)


# -----------------------------------------------------------------------------
# Module advanced initialization
# -----------------------------------------------------------------------------
APP = None


def configure_protocol(root_protocol):
    root_protocol.registerLinkProtocol(SimputProtocol())


def setup(app, **kwargs):
    global APP
    APP = app
    app.add_protocol_to_configure(configure_protocol)


# -----------------------------------------------------------------------------


def register_manager(ui_manager, domains_manager=None):
    global MANAGERS
    MANAGERS[ui_manager.id] = {
        "ui_manager": ui_manager,
        "domains_manager": domains_manager,
    }


def create_helper(
    ui_manager,
    domains_manager=None,
    namespace="simput",
):
    register_manager(ui_manager, domains_manager)
    return SimputHelper(
        APP, ui_manager, namespace=namespace, domains_manager=domains_manager
    )
