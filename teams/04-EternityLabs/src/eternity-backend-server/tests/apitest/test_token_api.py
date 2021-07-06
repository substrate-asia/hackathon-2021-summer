from . import ApiTestCase


class TestTokenApi(ApiTestCase):
    def test_erc20distribute(self):
        payload = self.client.get("/token/substrate/erc20distribute")
        address = payload[0]["address"]
        assert address