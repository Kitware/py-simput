from pywebvue import App
from simput.core import ProxyManager, UIManager, DomainManager
import simput.domains
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

domains = DomainManager()
pxm = ProxyManager()
pxm.add_decorator(domains)
ui_resolver = VuetifyResolver()
uim = UIManager(pxm, ui_resolver)

pxm.load_model(yaml_content=app.txt("./model.yaml"))
uim.load_language(yaml_content=app.txt("./model.yaml"))
uim.load_ui(xml_content=app.txt("./ui.xml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(uim, domains=domains)

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
