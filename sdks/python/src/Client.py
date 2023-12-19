import requests
from error import StratusError

class Config:
    def __init__(self, api_key, api_url):
        self.api_key = api_key
        self.api_url = api_url

class RateLimitConfigOptions:
    def __init__(self, limit=None, window=None):
        self.limit = limit
        self.window = window

class Client:
    def __init__(self, config):
        self._api_key = config.api_key
        self._api_url = config.api_url

    def rate_limit(self, rate_limit_options=None):
        headers = {
            "X-Api-Key": self._api_key,
            "Content-Type": "application/json"
        }

        # optional rate limit config
        if rate_limit_options:
            if rate_limit_options.limit:
                headers["limit"] = str(rate_limit_options.limit)
            if rate_limit_options.window:
                headers["window"] = str(rate_limit_options.window)

        response = requests.post(self._api_url, headers=headers)

        # 200 - successful
        if response.ok:
            return False
        # 429 - successful, but rate limited
        if response.status_code == 429:
            return True

        # errors
        raise StratusError(response.status_code, response.text)
