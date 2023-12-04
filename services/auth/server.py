import inspect
import sys
import logging
import datetime
import os
# Importing constants from parent directory by appending to sys.path
sys.path.append(os.path.abspath('.'))
import constants
from services.database.auth_access import auth_db_access
import jwt
from flask import Flask, request
from flask import jsonify

app = Flask(__name__)

app.config["JWT_SECRET"] = constants.JWT_SECRET_KEY

@app.route("/auth/login", methods=["POST"])
def login():
    auth = request.authorization
    is_valid_user = auth_db_access.login(auth.username, auth.password)
    if not auth:
        return jsonify({"message": "No authorization provided"}), 401
    elif not is_valid_user:
        return jsonify({"message": "Invalid credentials"}), 401
    else:
        logging.info("User {} logged in".format(auth.username))
        token = jwt.encode({
            "user": auth.username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config["JWT_SECRET"])
        return jsonify({"token": token.decode("UTF-8")})
    
app.run()
