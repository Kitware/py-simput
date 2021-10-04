import asyncio
from pywebvue import App
from simput.core import ObjectManager, UIManager
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

obj_manager = ObjectManager()
ui_resolver = VuetifyResolver()
ui_manager = UIManager(obj_manager, ui_resolver)

obj_manager.load_model(yaml_content=app.txt("./model.yaml"))
ui_manager.load_language(yaml_content=app.txt("./model.yaml"))
ui_manager.load_ui(xml_content=app.txt("./ui.xml"))

# For VTK object creation
obj_manager.register_construtor("Cone", vtkConeSource)
obj_manager.register_construtor("Sphere", vtkSphereSource)
obj_manager.register_construtor("Diskout", Diskout)
obj_manager.register_construtor("Representation", Representation)
obj_manager.register_construtor("vtkContourFilter", vtkContourFilter)
obj_manager.register_construtor("vtkClipDataSet", vtkClipDataSet)
obj_manager.register_construtor("vtkPlane", vtkPlane)

# Setup network handlers + state properties
simput = SimPut.create_helper(ui_manager)
simput.auto_update = True

# Fill drop down with available objects
app.set("sourceTypes", obj_manager.types("Source"))
app.set("filterTypes", obj_manager.types("Filter"))

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
    sources = obj_manager.tags("Source")
    filters = obj_manager.tags("Filter")
    sources_ids = list(map(lambda p: p.get("id"), sources))
    filters_ids = list(map(lambda p: p.get("id"), filters))
    app.set("sourceIds", sources_ids + filters_ids)


# -----------------------------------------------------------------------------


def update_view(*args, **kwargs):
    app.set("view", VTK.scene(view.render_window))
    app.set("exportContent", None)


# -----------------------------------------------------------------------------


@app.trigger("create")
def create_object(name, type):
    obj = obj_manager.create(type, _name=name)
    app.set("activeSourceId", obj.get("id"))


# -----------------------------------------------------------------------------


@app.trigger("create_filter")
def create_filter(name, type):
    input = app.get("activeSourceId")
    if input:
        print("create filter with input - begin", input)
        filter = obj_manager.create(type, _name=name, Input=input)
        print("create filter with input - end", filter)
        app.set("activeSourceId", filter.get("id"))


# -----------------------------------------------------------------------------


@app.trigger("delete")
def delete_object(obj_id):
    active_id = app.get("activeSourceId")
    obj_manager.delete(obj_id)
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
    rep_id = None
    if src_id:
        rep_id = obj_manager.get(src_id).get("properties").get("Representation")
    app.set("activeRepresentationId", rep_id)


def on_change(topic, ids=None, **kwargs):
    update_sources()
    update_view()


obj_manager.on_change(on_change)

# -----------------------------------------------------------------------------
# Import / Export
# -----------------------------------------------------------------------------


@app.change("importFile")
def import_file():
    file_data = app.get("importFile")
    if file_data:
        json_content = file_data.get("content").decode("utf-8")
        obj_manager.load(file_content=json_content)

    # reset current import
    app.set("importFile", None)


# -----------------------------------------------------------------------------


@app.trigger("export")
def export_state():
    app.set("exportContent", obj_manager.save())


# -----------------------------------------------------------------------------
# Start server
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    update_sources()
    app.run_server()
