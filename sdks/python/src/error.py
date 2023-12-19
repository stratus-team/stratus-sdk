class StratusError(Exception):
    def __init__(self, code, cause=None):
        super().__init__()
        self.code = code
        self.cause = cause if cause is not None else "Cause unavailable"
