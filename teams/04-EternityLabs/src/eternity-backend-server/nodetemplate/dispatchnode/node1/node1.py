from flask import Flask, jsonify

node1 = Flask(__name__)

@node1.route("/")
def node1index():
    data = {
        "model": "mxc_post_token_7day",
        "address": "5HjY6wPoN6YXvp3Wew6uNRzbZEtTeoKrrKazALkPikVRdEAj",
        "dexaddress": "0xbacd15010678bd31197f6eb6b971ab7154674d48",
        "stake": 0,
        "ipport": ":4040"
    }
    return jsonify(data)

if __name__ == '__main__':
    node1.run(port=8001)