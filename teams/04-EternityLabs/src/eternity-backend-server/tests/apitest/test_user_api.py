from . import ApiTestCase


class TestUserApi(ApiTestCase):
    def test_accountinfo(self):
        payload = self.client.get("/user/accountinfo/0x123124")
        AccountId = payload["AccountId"]
        assert AccountId