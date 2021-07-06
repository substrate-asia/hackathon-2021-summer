from flask import Flask, jsonify
from environs import load_dotenv
from environs import Env
import os
import socket

env = Env()
env.read_env()

port = env.int("NODE_PORT")

node1 = Flask(__name__)

@node1.route("/")
def node1index():
    data = {
        "model": "mxc_post_token_7day",
        "address": "5HjY6wPoN6YXvp3Wew6uNRzbZEtTeoKrrKazALkPikVRdEAj",
        "dexaddress": "0xbacd15010678bd31197f6eb6b971ab7154674d48",
        "stake": 0,
        "ipport": port
    }
    return jsonify(data)

def get_addr():
    hostname = socket.gethostname()
    return socket.gethostbyname(hostname)


if __name__ == '__main__':
    node1.run(host="0.0.0.0", port=port)
