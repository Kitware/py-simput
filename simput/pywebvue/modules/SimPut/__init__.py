import os

from wslink import register as exportRpc
from wslink.websocket import LinkProtocol

from icecream import ic

import json

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


class SimputHelper:
    def __init__(self, app, ui_manager, namespace="simput", domain_manager=None):
        self._app = app
        self._ui_manager = ui_manager
        self._domain_manager = domain_manager
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
        ic("apply")
        self._ui_manager.proxymanager.commit_all()
        self.reset()

    def reset(self):
        ic("reset")
        ids_to_update = list(self._pending_changeset.keys())
        self._pending_changeset = {}
        self._app.set(self.changecount_key, 0)
        self._app.set(self.changeset_key, [])

        self._ui_manager.proxymanager.reset_all()

        # Go ahead and push changes
        for _id in ids_to_update:
            self.push(id=_id, constraints=_id)

    def refresh(self, id=0, property=""):
        ic("refresh")
        print("refresh not implemented...")
        # if self._ui_manager.proxymanager.refresh(id, property):
        #     _props = self._ui_manager.proxymanager.get(id).get("properties", {})
        #     _prop_to_push = {property: _props[property]}
        #     self._ui_manager.proxymanager._push(id, _prop_to_push)
        #     self._ui_manager.proxymanager._emit("change", ids=[id])
        #     self._app.protocol_call(
        #         "simput.push", self._ui_manager.id, id=id, type=None
        #     )

    def push(self, id=None, type=None, constraints=None):
        if id:
            self._app.protocol_call("simput.data.get", self._ui_manager.id, id)
        if type:
            self._app.protocol_call("simput.ui.get", self._ui_manager.id, type)
        if constraints:
            self._app.protocol_call("simput.constraints.get", self._ui_manager.id, constraints)

    def emit(self, topic, **kwargs):
        self._app.protocol_call("simput.push.event", topic, **kwargs)

    def update(self, change_set):
        ic("update")
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
        if self._domain_manager and self._domain_manager.has_dirty():
            for msg in self._domain_manager.get_dirty_constraints():
                self._app.protocol_call("simput.message.push", msg)
            self._domain_manager.clear_dirty()

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
    @exportRpc("simput.push")
    def push(self, manager_id, id=None, type=None):
        handler = MANAGERS.get(manager_id, None)
        if handler is None:
            print(f"No manager found for id {manager_id}")
            return

        uim = handler.get("uim")

        message = {"id": id, "type": type}
        if id is not None:
            message.update({"data": uim.data(id)})

        if type is not None:
            message.update({"ui": uim.ui(type)})

        print(json.dumps(message, indent=2))

        self.publish("simput.push", message)

    @exportRpc("simput.data.get")
    def get_data(self, manager_id, id):
        ic("get_data", id)
        handler = MANAGERS.get(manager_id, None)
        if handler is None:
            print(f"No manager found for id {manager_id}")
            return

        uim = handler.get("uim")
        msg = {"id": id, "data": uim.data(id)}
        self.send_message(msg)
        return msg

    @exportRpc("simput.ui.get")
    def get_ui(self, manager_id, type):
        ic("get_ui", type)
        handler = MANAGERS.get(manager_id, None)
        if handler is None:
            print(f"No manager found for id {manager_id}")
            return

        uim = handler.get("uim")
        msg = {"type": type, "ui": uim.ui(type)}
        self.send_message(msg)
        return msg

    @exportRpc("simput.constraints.get")
    def get_constraints(self, manager_id, id):
        ic("get_constraints", id)
        handler = MANAGERS.get(manager_id, None)
        if handler is None:
            print(f"No manager found for id {manager_id}")
            return

        msg = {"id": id, "constraints": {} }

        domains = handler.get("domains", None)
        if domains:
            msg["constraints"] = domains.constraints(id)

        self.send_message(msg)
        return msg

    @exportRpc("simput.message.push")
    def send_message(self, message):
        self.publish("simput.push", message)

    @exportRpc("simput.push.event")
    def emit(self, topic, **kwargs):
        event = {"topic": topic, **kwargs}
        self.publish("simput.event", event)


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


def register_manager(manager, domains=None):
    global MANAGERS
    MANAGERS[manager.id] = {"uim": manager, "domains": domains}


def create_helper(manager, namespace="simput", domains=None):
    register_manager(manager, domains)
    return SimputHelper(APP, manager, namespace, domain_manager=domains)
