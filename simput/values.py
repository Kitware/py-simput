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
        self._array_location, self._array_name = value.split("::")

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
