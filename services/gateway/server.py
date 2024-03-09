from typing import Optional
import pika
from flask import Flask, request, jsonify
from auth_svc.login import login_svc, validate_token_svc
from auth_svc.validate_token import validate_token
from transaction_svc.transaction_deposit import deposit as deposit_service
from transaction_svc.transaction_withdraw import withdraw as withdraw_service
from transaction_svc.transaction_get_balance import get_account_balance as request_account_balance
from transaction_svc.transaction_get_balance import get_account_balance_response
from transaction_svc.transaction_get_balance import get_transaction_list
from flask_cors import CORS
from waitress import serve
import pyodbc


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
# channel = connection.channel()

# db_connection = pyodbc.connect(
#     "Driver={ODBC Driver 17 for SQL Server};"
#     f"Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
#     f"Database=distributed-systems-banking-app;"
#     f"Uid=banking-app-admin;"
#     "Pwd={16!7250%z2$X76&};"
#     "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
# )

@app.route("/login", methods=["POST"])
def login():
    """
    Authenticates the user and returns a token if the credentials are valid.

    Returns:
        If the credentials are valid, returns a JSON response containing the token and a status code of 200.
        If the credentials are invalid, returns a JSON response with an error message and a status code of 401.
    """
    auth = request.get_json()

    resp, status = login_svc(auth['username'], auth['password'])
    

    if status == 200:
        return jsonify({"token": resp}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/check-token", methods=["POST"])
def check_token():
    """
    Validates the given token by making a request to the authentication service.

    Returns:
        If the token is valid, returns a JSON response with a success message and a status code of 200.
        If the token is invalid, returns a JSON response with an error message and a status code of 401.
    """
    is_valid_token, msg, status_code = validate_token(request.headers.get('Authorization'))
    
    if is_valid_token:
        return jsonify({"message": "Token is valid"}), 200
    else:
        return jsonify(msg), status_code

@app.route("/deposit", methods=["POST"])
def deposit():
    """
    Deposit funds into the user's account.

    Returns:
        If the deposit is successful, returns a JSON response with a success message and a status code of 200.
        If there is an error during the deposit process, returns a JSON response with an error message and the corresponding status code.
    """
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    msg, status_code, username = validate_token_svc(request.headers.get('Authorization'))
    
    amount = float(request.get_json()["amount"])
    
    if status_code != 200:
        return msg, status_code
    
    
    # deposit_status, err = deposit_service(msg['user'], request, channel)
    
    
    try:
        cursor = db_connection.cursor()
        cursor.execute(f"""
                        INSERT INTO customer_cash (username, amount, status, date, time)
                        VALUES ('{username}', {amount}, 'Complete', CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME))
                        """
                        )
        db_connection.commit()
        # close the connection
        cursor.close()
        db_connection.close()
        return jsonify({"message": "Deposit successful"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": str(e)}), 500
        

@app.route("/withdraw", methods=["POST"])
def withdraw():
    """
    Withdraws funds from the user's account.

    Returns:
        If the withdrawal is successful, returns a JSON response with a success message and a status code of 200.
        If there is an error during the withdrawal process, returns a JSON response with an error message and the corresponding status code.
    """
    # token, error_msg, status_code = validate_token(request)
    
    # if not token:
    #     return jsonify(error_msg), status_code
    
    # withdraw_status, error_msg, status_code = withdraw_service(request)
    # if withdraw_status:
    #     return jsonify({"message": "Withdraw successful"}), 200
    # else:
    #     return jsonify(error_msg), status_code
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    msg, status_code, username = validate_token_svc(request.headers.get('Authorization'))
    amount = float(request.get_json()["amount"])
    amount = amount * -1
    
    if status_code != 200:
        return msg, status_code
    
    
    # deposit_status, err = deposit_service(msg['user'], request, channel)
    
    
    try:
        cursor = db_connection.cursor()
        print((f"""
                        INSERT INTO customer_cash (username, amount, status, date, time)
                        VALUES ('{username}', {amount}, 'Complete', CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME))
                        """
                        ))
        cursor.execute(f"""
                        INSERT INTO customer_cash (username, amount, status, date, time)
                        VALUES ('{username}', {amount}, 'Complete', CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME))
                        """
                        )
        db_connection.commit()
        # close the connection
        cursor.close()
        db_connection.close()
        return jsonify({"message": "Withdrawal successful"}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": str(e)}), 500

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
        
@app.route("/get_transactions/<username>", methods=["GET"])
def get_transactions(username):
    """
    Get the transaction list of the user.

    Args:
        username: The username of the user.

    Returns:
        If the request is successful, returns a JSON response with the transaction list and a status code of 200.
        If there is an error during the request, returns a JSON response with an error message and the corresponding status code.
    """
    # is_success, err, transactions = get_transaction_list(username)

    # if is_success:
    #     return jsonify({"transactions": transactions}), 200
    # else:
    #     return jsonify(err), 500
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    cursor = db_connection.cursor()
    
    transactions_out = None

    try:
        cursor.execute(f"""
                        SELECT * FROM customer_cash
                        WHERE username = '{username}'
                        ORDER BY date DESC, time DESC
                        """
                        )
        transactions = cursor.fetchall()
        transactions = [dict(zip([column[0] for column in cursor.description], row)) for row in transactions]

        for transaction in transactions:
            transaction["username"] = str.strip(transaction["username"])
            transaction["amount"] = float(transaction["amount"])
            transaction['date'] = transaction['date'].strftime("%Y-%m-%d")
            transaction['time'] = transaction['time'].strftime("%H:%M:%S")

        transactions_out =  transactions
        
        # close the connection
        cursor.close()
        db_connection.close()
    except Exception as e:
        print(" [x] Error: ", e)
        transactions_out = None
        
    if transactions_out is None:
        return jsonify({"message": "Error getting transaction list"}), 500
    else:
        return jsonify({"transactions": transactions}), 200
    

if __name__ == "__main__":
    # log that the server is running and on which port
    print("Gateway server running on port 8080")
    serve(app, host="0.0.0.0", port=8080)
