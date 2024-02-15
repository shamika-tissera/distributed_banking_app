from flask import Flask, request, jsonify
import db_access

app = Flask(__name__)

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
    app.run(host="0.0.0.0", port=5000)
