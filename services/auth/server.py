import inspect
import sys
import jwt, datetime, os
from flask import Flask, request
from flask import jsonify

# Importing constants from parent directory by appending to sys.path
sys.path.append(os.path.abspath('.'))
import constants
from services.database.auth_access import auth_db_access

app = Flask(__name__)


app.config["MYSQL_HOST"] = constants.MYSQL_HOST
app.config["MYSQL_USER"] = constants.MYSQL_USER
app.config["MYSQL_PASSWORD"] = constants.MYSQL_PASSWORD
app.config["MYSQL_DB"] = constants.MYSQL_DB
app.config["MYSQL_PORT"] = constants.MYSQL_PORT

@app.route("/auth/login", methods=["POST"])
def login():
    auth = request.authorization
    auth_db_access.login("", "")
    if not auth:
        return jsonify({"message": "No authorization provided"}), 401
    
    return jsonify({"message": "No authorization provided"}), 401
    
app.run()