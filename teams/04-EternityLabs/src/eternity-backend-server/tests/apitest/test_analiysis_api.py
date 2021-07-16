from . import ApiTestCase
class TestAnaliysisApi(ApiTestCase):
    def test_contractpricedifference(self):
        payload = self.client.get("/analiysis/contractpricedifference")
        aDexName = payload[0]["dex"]
        assert aDexName
