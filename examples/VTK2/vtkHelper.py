import os
from vtkmodules.vtkFiltersSources import vtkConeSource
from vtkmodules.vtkRenderingCore import (
    vtkRenderer,
    vtkRenderWindow,
    vtkRenderWindowInteractor,
    vtkPolyDataMapper,
    vtkActor,
)
from vtkmodules.vtkInteractionStyle import vtkInteractorStyleSwitch
from vtkmodules.vtkIOExodus import vtkExodusIIReader


class Diskout(vtkExodusIIReader):
    def __init__(self):
        super().__init__()
        file_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "data/disk_out_ref.ex2"
        )
        self.SetFileName(file_path)
        for name in ["Temp", "V", "Pres", "AsH3", "GaMe3", "CH4", "H2"]:
            self.SetPointResultArrayStatus(name, 1)
        self.Update()

    # def GetOutputPort(self, port=0):
    #     return self._reader.GetOutputPort(port)

    # def GetMTime(self):
    #     return self._reader.GetMTime()

    # def IsA(self, class_name):
    #     return self._reader.IsA(class_name)

    # def GetOutput(self, port):
    #     return self._reader.GetOutput(port)


class View:
    def __init__(self):
        self._renderer = vtkRenderer()
        self._renderWindow = vtkRenderWindow()
        self._renderWindow.AddRenderer(self._renderer)
        self._renderWindowInteractor = vtkRenderWindowInteractor()
        self._renderWindowInteractor.SetRenderWindow(self._renderWindow)
        self._renderWindowInteractor.GetInteractorStyle().SetCurrentStyleToTrackballCamera()
        self._renderWindowInteractor.EnableRenderOff()
        self._representations = []

    def SetRepresentations(self, reps):
        pass

    def GetRepresentations(self):
        return self._representations

    @property
    def render_window(self):
        return self._renderWindow

    @property
    def renderer(self):
        return self._renderer

    def ResetCamera(self):
        self._renderer.ResetCamera()


class Representation:
    _active_view = None

    @staticmethod
    def setView(view):
        Representation._active_view = view

    def __init__(self):
        self.mapper = vtkPolyDataMapper()
        self.actor = vtkActor()
        self.actor.SetMapper(self.mapper)
        self._view = None
        self._input = None
        self.actor.SetVisibility(0)

        if Representation._active_view:
            self.SetView(Representation._active_view)

    def SetView(self, view):
        if self._view and self._view != view:
            self._view.renderer.RemoveActor(self.actor)

        self._view = view
        if self._view:
            self._view.renderer.AddActor(self.actor)

    def GetView(self):
        return self._view

    def SetInput(self, algo):
        self.actor.SetVisibility(0)
        self._input = algo
        if self._input:
            self.actor.SetVisibility(1)
            self.mapper.SetInputConnection(self._input.GetOutputPort(0))

    def GetInput(self):
        return self._input

    def GetOpacity(self):
        return self.actor.GetProperty().GetOpacity()

    def SetOpacity(self, v):
        self.actor.GetProperty().SetOpacity(v)

    def GetVisibility(self):
        if self._input:
            return self.actor.GetVisibility()
        return 1

    def SetVisibility(self, v):
        self.actor.SetVisibility(v)

    def GetMTime(self):
        return self.actor.GetProperty().GetMTime()
