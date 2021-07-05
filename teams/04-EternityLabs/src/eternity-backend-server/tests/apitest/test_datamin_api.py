from . import ApiTestCase
class TestDataminApi(ApiTestCase):
    def test_contractaddress(self):
        payload = self.client.get("/datamin/eth/contractaddress")
        status = payload["status"]
        assert status

