import inspect
import sys
import logging
import datetime
import os
# Importing constants from parent directory by appending to sys.path
sys.path.append(os.path.abspath('../../'))
import constants
from services.transactions_deposit import auth_db_access
import jwt
from flask import Flask, request
from flask import jsonify
from enums import DepositTransactionStatus

app = Flask(__name__)

app.config["JWT_SECRET"] = constants.JWT_SECRET_KEY

@app.route("/transactions/deposit", methods=["POST"])
def transactions_deposit():
    """
    Endpoint for depositing funds into a user's account.

    Returns:
        JSON: A JSON response indicating the success or failure of the deposit.
    """
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "No authorization provided"}), 401
    
    jwt.decode(token, app.config["JWT_SECRET"], algorithms=["HS256"])
    
    try:
        jwt.decode(token, app.config["JWT_SECRET"], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401
    # receive deposit data
    data = request.get_json()
    username = data["username"]
    amount = data["amount"]
    # currency = data["currency"]
    # check if user is valid
    is_valid_user = auth_db_access.is_valid_user(username)
    
    if not is_valid_user:
        return jsonify({"message": "Invalid user"}), 401
    
    try:
        amount = float(amount)
    except ValueError:
        return jsonify({"message": "Invalid amount"}), 400
    
    # check if amount is valid
    if amount <= 0:
        return jsonify({"message": "Invalid amount"}), 400
    
    transaction_status = auth_db_access.transactions_deposit(username, amount)
    
    if transaction_status:
        return jsonify({"message": "Deposit successful"}), 200
    else:
        return jsonify({"message": "Internal failure"}), 500
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)