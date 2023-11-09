import inspect
import sys
import jwt, datetime, os
from flask import Flask, request
from flask import jsonify
import logging

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
        }, constants.JWT_SECRET_KEY)
        return jsonify({"token": token.decode("UTF-8")})
    
app.run()