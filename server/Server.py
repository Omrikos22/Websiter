from flask import Flask


def run_server(port):
    app = Flask(__name__)
    app.run(host='0.0.0.0', port=port)