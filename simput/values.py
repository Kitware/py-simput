r"""
Values are light weight object which can be assimilated as native type.
"""
from simput.core import ObjectValue


class Array(ObjectValue):
    def __init__(self, state_value):
        self._array_location = None
        self._array_name = None

        # Initialize state
        self.state = state_value

    @property
    def state(self):
        return f"{self._array_location}::{self._array_name}"

    @state.setter
    def state(self, value):
        if value:
            self._array_location, self._array_name = value.split("::")
        else:
            self._array_location = "Point"
            self._array_name = ""

    @property
    def location(self):
        return self._array_location

    @location.setter
    def location(self, value):
        self._array_location = value

    @property
    def name(self):
        return self._array_name

    @name.setter
    def name(self, value):
        self._array_name = value


# -----------------------------------------------------------------------------
# Registration
# -----------------------------------------------------------------------------
def register_values():
    ObjectValue.register("value::Array", Array)
