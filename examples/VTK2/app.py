import asyncio
from pywebvue import App
from simput.core import ProxyManager, UIManager, ObjectFactory, DomainManager, fetch
from simput.domains import register_domains
from simput.ui.web import VuetifyResolver
from simput.pywebvue.modules import SimPut
from pywebvue.modules import VTK

from vtkmodules.vtkCommonDataModel import vtkPlane
from vtkmodules.vtkFiltersGeneral import vtkClipDataSet
from vtkmodules.vtkFiltersSources import (
    vtkConeSource,
    vtkSphereSource,
)
from vtkmodules.vtkFiltersCore import vtkContourFilter
from vtkHelper import View, Representation, Diskout

from icecream import ic

# -----------------------------------------------------------------------------
# App initialization
# -----------------------------------------------------------------------------

app = App("VTK Demo", debug=True)
app.state = {
    # UI toggle for drawer
    "showMenu": True,
    "drawerMode": 0,
    "expansionPanels": [0, 1, 2],
    # Data handling
    "activeSourceId": None,
    "activeRepresentationId": None,
    "sourceIds": [],
    # Object creation
    "sourceName": "",
    "filterName": "",
    "sourceType": "",
    "sourceTypes": [],
    "filterType": "",
    "filterTypes": [],
    # 3D view
    "view": None,
    # Import/Export
    "importFile": None,
    "exportContent": None,
}
app.enableModule(SimPut)
app.enableModule(VTK)

# -----------------------------------------------------------------------------
# SimPut initialization
# -----------------------------------------------------------------------------

# For VTK object creation
vtk_factory = ObjectFactory()
vtk_factory.register("Cone", vtkConeSource)
vtk_factory.register("Sphere", vtkSphereSource)
vtk_factory.register("Diskout", Diskout)
vtk_factory.register("Representation", Representation)
vtk_factory.register("vtkContourFilter", vtkContourFilter)
vtk_factory.register("vtkClipDataSet", vtkClipDataSet)
vtk_factory.register("vtkPlane", vtkPlane)

# Automatically create proxy from definition
register_domains()

pxm = ProxyManager(vtk_factory)
ui_manager = UIManager(pxm, VuetifyResolver())
domains_manager = DomainManager()

pxm.add_life_cycle_listener(domains_manager)
pxm.load_model(yaml_content=app.txt("./model.yaml"))

ui_manager.load_language(yaml_content=app.txt("./model.yaml"))
ui_manager.load_ui(xml_content=app.txt("./ui.xml"))

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager)
simput.auto_update = True

# Fill drop down with available objects
app.set("sourceTypes", pxm.types("Source"))
app.set("filterTypes", pxm.types("Filter"))

# -----------------------------------------------------------------------------
# VTK management
# -----------------------------------------------------------------------------

allow_reset_camera_on_ready = True
view = View()
Representation.setView(view)

# -----------------------------------------------------------------------------
# Data management
# -----------------------------------------------------------------------------


def update_sources(*args, **kwargs):
    sources = pxm.tags("Source")
    filters = pxm.tags("Filter")
    sources_ids = list(map(lambda p: p.id, sources))
    filters_ids = list(map(lambda p: p.id, filters))
    app.set("sourceIds", sources_ids + filters_ids)


# -----------------------------------------------------------------------------


def update_view(*args, **kwargs):
    ic("update_view")
    app.set("view", VTK.scene(view.render_window))
    app.set("exportContent", None)


# -----------------------------------------------------------------------------


@app.trigger("create")
def create_object(name, type):
    obj = pxm.create(type, _name=name)
    fetch(obj, list(obj.get_properties().keys()))
    app.set("activeSourceId", obj.id)


# -----------------------------------------------------------------------------


@app.trigger("create_filter")
def create_filter(name, type):
    input = app.get("activeSourceId")
    if input:
        print("create filter with input - begin", input)
        filter = pxm.create(type, _name=name, Input=input)
        fetch(filter, list(filter.get_properties().keys()))
        print("create filter with input - end", filter)
        app.set("activeSourceId", filter.id)


# -----------------------------------------------------------------------------


@app.trigger("delete")
def delete_object(obj_id):
    active_id = app.get("activeSourceId")
    pxm.delete(obj_id)
    if active_id == obj_id:
        app.set("activeSourceId", None)


# -----------------------------------------------------------------------------


@app.trigger("viewReady")
def on_ready():
    global allow_reset_camera_on_ready
    if allow_reset_camera_on_ready:
        allow_reset_camera_on_ready = False
        app.update(ref="view", method="resetCamera")


# -----------------------------------------------------------------------------


@app.change("activeSourceId")
def update_active_representation():
    src_id = app.get("activeSourceId")
    rep = None
    if src_id:
        rep = pxm.get(src_id)["Representation"]
    app.set("activeRepresentationId", rep.id)


def on_change(topic, ids=None, **kwargs):
    update_sources()
    update_view()


pxm.on(on_change)

# -----------------------------------------------------------------------------
# Import / Export
# -----------------------------------------------------------------------------


@app.change("importFile")
def import_file():
    file_data = app.get("importFile")
    if file_data:
        json_content = file_data.get("content").decode("utf-8")
        pxm.load(file_content=json_content)

    # reset current import
    app.set("importFile", None)


# -----------------------------------------------------------------------------


@app.trigger("export")
def export_state():
    app.set("exportContent", pxm.save())


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_sources()
    app.run_server()
