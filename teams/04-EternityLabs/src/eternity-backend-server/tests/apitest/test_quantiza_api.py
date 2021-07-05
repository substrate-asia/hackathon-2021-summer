from . import ApiTestCase


class TestQuantizaApi(ApiTestCase):
    def test_list_node_info(self):
        payload = self.client.get("/quantize/substrate/listnodeinfo")
        nodeName = payload[0]["name"]
        assert nodeName