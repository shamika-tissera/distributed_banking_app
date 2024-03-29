from flask import Flask, jsonify
from flask_cors import CORS
import db_access
from waitress import serve

app = Flask(__name__)
CORS(app)

@app.route("/transactions/get-transaction-list/<username>", methods=["GET"])
def get_transaction_list(username):
    """
    Get the transaction list of the user.

    Args:
        username: The username of the user.

    Returns:
        A JSON response with the transaction list if the request is successful.
        A JSON response with an error message if the request is unsuccessful.
    """
    transactions = db_access.get_transaction_list(username)

    if transactions is None:
        return jsonify({"message": "Error getting transaction list"}), 500
    else:
        return jsonify({"transactions": transactions}), 200

if __name__ == "__main__":
    serve(app, host="0.0.0.0.", port=5000)
