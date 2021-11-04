from pywebvue import App
from simput.core import ProxyManager, UIManager, ProxyDomainManager
from simput.ui.web import VuetifyResolver
from simput.pywebvue.modules import SimPut

from simput.domains import register_domains
from simput.values import register_values

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("Widgets Hints", debug=False)
app.enableModule(SimPut)

# -----------------------------------------------------------------------------
# SimPut initialization
# -----------------------------------------------------------------------------

# Automatically create proxy from definition
register_domains()
register_values()

pxm = ProxyManager()
ui_resolver = VuetifyResolver()
ui_manager = UIManager(pxm, ui_resolver)
pdm = ProxyDomainManager()

pxm.add_life_cycle_listener(pdm)
pxm.load_model(yaml_content=app.txt("./model.yaml"))
ui_manager.load_language(yaml_content=app.txt("./model.yaml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager, pdm)

# -----------------------------------------------------------------------------
# Generate Sample data
# -----------------------------------------------------------------------------

choices = []
for obj_type in pxm.types():
    item = pxm.create(obj_type)
    choices.append({"text": obj_type, "value": item.id})

app.set("choices", choices)
app.set("active", choices[0].get("value"))

# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    app.run_server()
