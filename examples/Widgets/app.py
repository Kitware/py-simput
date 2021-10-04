from pywebvue import App
from simput.core import ObjectManager, UIManager
from simput.ui.web import VuetifyResolver
from simput.pywebvue.modules import SimPut

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("Widgets Demo", debug=False)
app.state = {
    "autoUI": True,
    "showChangeSet": False,
}
app.enableModule(SimPut)

# -----------------------------------------------------------------------------
# SimPut initialization
# -----------------------------------------------------------------------------

obj_manager = ObjectManager()
ui_resolver = VuetifyResolver()
ui_manager = UIManager(obj_manager, ui_resolver)

obj_manager.load_model(yaml_content=app.txt("./model.yaml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager)

# -----------------------------------------------------------------------------
# Generate Sample data
# -----------------------------------------------------------------------------

choices = []
for obj_type in obj_manager.available_types:
    item = obj_manager.create(obj_type)
    choices.append({"text": obj_type, "value": item.get("id")})

app.set("choices", choices)
app.set("active", choices[0].get("value"))


@app.change("autoUI")
def update_ui():
    auto_ui = app.get("autoUI")
    ui_manager.load_language(yaml_content=app.txt("./model.yaml"), clear_ui=True)
    if not auto_ui:
        ui_manager.load_ui(xml_content=app.txt("./ui.xml"))


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_ui()
    app.run_server()
