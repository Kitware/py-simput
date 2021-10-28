from pywebvue import App
from simput.core import ProxyManager, UIManager
from simput.ui.web import VuetifyResolver
from simput.pywebvue.modules import SimPut

import random
import string


def randomName():
    letters = string.ascii_letters
    return "".join(random.choice(letters) for i in range(10))


# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("SimPut Demo", debug=True)
app.state = {
    # UI toggle for drawer
    "showMenu": True,
    # Data handling
    "activeId": None,
    "personIds": [],
    # Skip ui.xml loading
    "autoUI": False,
    # Language selector
    "lang": "en",
    "langs": [
        {"text": "English", "value": "en"},
        {"text": "Français", "value": "fr"},
    ],
}
app.enableModule(SimPut)

# -----------------------------------------------------------------------------
# SimPut initialization
# -----------------------------------------------------------------------------

pxm = ProxyManager()
ui_resolver = VuetifyResolver()
ui_manager = UIManager(pxm, ui_resolver)

pxm.load_model(yaml_content=app.txt("./model/model.yaml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager)

# -----------------------------------------------------------------------------
# Data management
# -----------------------------------------------------------------------------


def update_list(*args, **kwargs):
    ids = list(map(lambda p: p.id, pxm.get_instances_of_type("Person")))
    app.set("personIds", ids)


# -----------------------------------------------------------------------------


@app.trigger("create")
def create_person():
    person = pxm.create("Person")
    app.set("activeId", person.id)
    update_list()


# -----------------------------------------------------------------------------


@app.trigger("delete")
def delete_person():
    id_to_delete = app.get("activeId")
    pxm.delete(id_to_delete)
    app.set("activeId", None)
    update_list()


# -----------------------------------------------------------------------------


@app.trigger("edit")
def edit_person():
    id_to_edit = app.get("activeId")
    if id_to_edit:
        obj = pxm.update(
            [
                {
                    "id": id_to_edit,
                    "name": "FirstName",
                    "value": randomName(),
                }
            ]
        )


# -----------------------------------------------------------------------------


@app.change("lang", "autoUI")
def update_lang():
    lang, auto_ui = app.get("lang"), app.get("autoUI")
    ui_manager.load_language(
        yaml_content=app.txt(f"./model/lang_{lang}.yaml"), clear_ui=True
    )
    if not auto_ui:
        ui_manager.load_ui(xml_content=app.txt("./model/ui.xml"))


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_lang()
    app.client_only("showMenu")
    app.run_server()
