import os, gridfs, pika, json
from flask import Flask, request, jsonify
from auth_svc.login import login as login_service
from auth_svc.validate_token import validate_token
from transaction_svc.transaction_deposit import deposit as deposit_service
from transaction_svc.transaction_withdraw import withdraw as withdraw_service


app = Flask(__name__)

connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()

@app.route("/login", method=["POST"])
def login():
    token, status = login_service(request)
    
    if status == 200:
        return jsonify({"token": token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/deposit", method=["POST"])
def deposit():
    token, error_msg, status_code = validate_token(request.headers.get('Authorization'))
    
    if not token:
        return jsonify(error_msg), status_code
    
    deposit_status, error_msg, status_code = deposit_service(request)
    if deposit_status:
        return jsonify({"message": "Deposit successful"}), 200
    else:
        return jsonify(error_msg), status_code

@app.route("/withdraw", method=["POST"])
def withdraw():
    token, error_msg, status_code = validate_token(request)
    
    if not token:
        return jsonify(error_msg), status_code
    
    withdraw_status, error_msg, status_code = withdraw_service(request)
    if withdraw_status:
        return jsonify({"message": "Withdraw successful"}), 200
    else:
        return jsonify(error_msg), status_code
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555)
