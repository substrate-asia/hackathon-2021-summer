from . import ApiTestCase


class TestVerifyApi(ApiTestCase):
    def test_list_node_info(self):
        payload = self.client.get("/verify/substrate/listnodeinfo")
        nodeName = payload[0]["name"]
        assert nodeName