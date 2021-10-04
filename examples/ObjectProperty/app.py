from pywebvue import App
from simput.core import ObjectManager, UIManager
from simput.ui.web import VuetifyResolver
from simput.pywebvue.modules import SimPut

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("Object Property Demo", debug=False)
app.state = {
    "showChangeSet": False,
    "tab": 2,
}
app.enableModule(SimPut)

# -----------------------------------------------------------------------------
# SimPut initialization
# -----------------------------------------------------------------------------

obj_manager = ObjectManager()
ui_resolver = VuetifyResolver()
ui_manager = UIManager(obj_manager, ui_resolver)

obj_manager.load_model(yaml_content=app.txt("./model.yaml"))
ui_manager.load_language(yaml_content=app.txt("./model.yaml"))
ui_manager.load_ui(xml_content=app.txt("./ui.xml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager)

# -----------------------------------------------------------------------------

wavelet = obj_manager.create("Wavelet")
cone = obj_manager.create("Cone")
clip = obj_manager.create("Clip", Input=cone)

app.set("wavelet", wavelet.get("id"))
app.set("cone", cone.get("id"))
app.set("clip", clip.get("id"))

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
