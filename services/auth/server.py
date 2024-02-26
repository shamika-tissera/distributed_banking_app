import inspect
from flask_cors import CORS
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
CORS(app)

app.config["JWT_SECRET"] = os.environ.get("JWT_SECRET")
@app.route("/auth/login", methods=["POST"])
def login():
    """
    Authenticates the user and generates a JWT token.

    Returns:
        JSON response: A JSON response containing the generated token if the authentication is successful.
            Otherwise, returns an error message with the appropriate status code.
    """
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
        return jsonify(str(token))

@app.route("/auth/register", methods=["POST"])
def register():
    """
    Registers a new user.

    Returns:
        A JSON response with a success message if the registration is successful.
        A JSON response with an error message if the username is unavailable or if there is an internal failure.
    """
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
        return jsonify({"message": "Internal failure"}), 500
    
@app.route("/auth/validate-token", methods=["POST"])
def validate_token():
    """
    Validates the given token.

    Returns:
        A JSON response with a message indicating the validity of the token.
    """
    token = request.get_json()["token"]
    try:
        decoded = jwt.decode(token, app.config["JWT_SECRET"], algorithms=["HS256"])
        return decoded, 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

if __name__ == "__main__":
    # if not checker.check_constants_file_made():
    #     logging.error("Constants file not found. Please create one. Exiting...")
    #     sys.exit(1)
    
    # print IP address
    print(os.popen('hostname -I').read())
    
    app.run(host="0.0.0.0", port=5000)
