import inspect
import sys
import auth_db_access
import logging
import datetime
import os
import helper.checker as checker
# Importing constants from parent directory by appending to sys.path
sys.path.append(os.path.abspath('.'))
import constants
import jwt
from flask import Flask, request
from flask import jsonify
from enums import RegisterUserInfo

app = Flask(__name__)

app.config["JWT_SECRET"] = constants.JWT_SECRET_KEY

@app.route("/auth/login", methods=["POST"])
def login():
    auth = request.get_json()
    is_valid_user = auth_db_access.login(auth['username'], auth['password'])
    if not auth:
        return jsonify({"message": "No authorization provided"}), 401
    elif not is_valid_user:
        return jsonify({"message": "Invalid credentials"}), 401
    else:
        logging.info("User {} logged in".format(auth['username']))
        token = jwt.encode({
            "user": auth['username'],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config["JWT_SECRET"],
            algorithm="HS256")
        return jsonify({"token": str(token)})

@app.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    email = data["email"]
    register_status = auth_db_access.register(username, password, email)
    
    if register_status == RegisterUserInfo.SUCCESS:
        logging.info("User {} registered".format(username))
        return jsonify({"message": "Registration successful"}), 200
    elif register_status == RegisterUserInfo.USERNAME_UNAVAILABLE:
        return jsonify({"message": "Username taken"}), 409
    else:
        return jsonify({"message": "Internal failiure"}), 500

if __name__ == "__main__":
    # if not checker.check_constants_file_made():
    #     logging.error("Constants file not found. Please create one. Exiting...")
    #     sys.exit(1)
    
    # print IP address
    ip = os.popen('hostname -I').read()
    
    app.run(host="0.0.0.0", port=5000)
