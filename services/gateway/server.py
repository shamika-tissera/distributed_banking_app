from typing import Optional
import pika
from flask import Flask, request, jsonify
from auth_svc.login import login as login_service
from auth_svc.validate_token import validate_token
from transaction_svc.transaction_deposit import deposit as deposit_service
from transaction_svc.transaction_withdraw import withdraw as withdraw_service
from transaction_svc.transaction_get_balance import get_account_balance as request_account_balance
from transaction_svc.transaction_get_balance import get_account_balance_response


app = Flask(__name__)

connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()

@app.route("/login", methods=["POST"])
def login():
    """
    Authenticates the user and returns a token if the credentials are valid.

    Returns:
        If the credentials are valid, returns a JSON response containing the token and a status code of 200.
        If the credentials are invalid, returns a JSON response with an error message and a status code of 401.
    """
    token, status = login_service(request)
    
    if status == 200:
        return jsonify({"token": token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/deposit", methods=["POST"])
def deposit():
    """
    Deposit funds into the user's account.

    Returns:
        If the deposit is successful, returns a JSON response with a success message and a status code of 200.
        If there is an error during the deposit process, returns a JSON response with an error message and the corresponding status code.
    """
    is_valid_token, msg, status_code = validate_token(request.headers.get('Authorization'))
    
    if not is_valid_token:
        return jsonify(msg), status_code
    
    deposit_status, err = deposit_service(msg['user'], request, channel)
    
    if deposit_status:
        return jsonify({"message": "Deposit successful"}), 200
    else:
        print(err)
        return jsonify({"message": err}), 500

@app.route("/withdraw", methods=["POST"])
def withdraw():
    """
    Withdraws funds from the user's account.

    Returns:
        If the withdrawal is successful, returns a JSON response with a success message and a status code of 200.
        If there is an error during the withdrawal process, returns a JSON response with an error message and the corresponding status code.
    """
    token, error_msg, status_code = validate_token(request)
    
    if not token:
        return jsonify(error_msg), status_code
    
    withdraw_status, error_msg, status_code = withdraw_service(request)
    if withdraw_status:
        return jsonify({"message": "Withdraw successful"}), 200
    else:
        return jsonify(error_msg), status_code

@app.route("/get-account-balance", methods=["GET"])
def get_account_balance():
    """
    Get the account balance of the user.

    Returns:
        If the request is successful, returns a JSON response with the account balance and a status code of 200.
        If there is an error during the request, returns a JSON response with an error message and the corresponding status code.
    """
    is_valid_token, msg, status_code = validate_token(request)
    
    if not is_valid_token:
        return jsonify(msg), status_code
    
    status, err, message_id = request_account_balance(msg['user'], channel)
    
    if not status:
        return jsonify({"message": err}), 500
    else:
        balance: Optional[int] = get_account_balance_response(message_id)
        if balance is None:
            return jsonify({"message": "Internal failure"}), 500
        else:
            return jsonify({"balance": balance}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
