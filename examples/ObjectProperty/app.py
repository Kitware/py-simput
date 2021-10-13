from pywebvue import App
from simput.core import ProxyManager, UIManager, DomainManager
from simput.domains import register_domains
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

pxm = ProxyManager()
ui_manager = UIManager(pxm, VuetifyResolver())
domains_manager = DomainManager()

pxm.add_life_cycle_listener(domains_manager)
pxm.load_model(yaml_content=app.txt("./model.yaml"))

ui_manager.load_language(yaml_content=app.txt("./model.yaml"))
ui_manager.load_ui(xml_content=app.txt("./ui.xml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager, domains_manager)

register_domains()

# -----------------------------------------------------------------------------

wavelet = pxm.create("Wavelet")
cone = pxm.create("Cone")
clip = pxm.create("Clip", Input=cone)

app.set("wavelet", wavelet.id)
app.set("cone", cone.id)
app.set("clip", clip.id)

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
