from . import ApiTestCase


class TestIpfsApi(ApiTestCase):
    def test_get_ipfshash_by_blockhash(self):
        payload = self.client.get("/dispatch/substrate/0x123123/get/GLKWJEOIWUEOPGWJEGWEGPWGWEIG")
        code = payload["code"]
        assert code