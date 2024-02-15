import pyodbc, os

def get_transaction_list(username):
    """
    Get the transaction list of the user.

    Args:
        username: The username of the user.

    Returns:
        A JSON response with the transaction list if the request is successful.
        A JSON response with an error message if the request is unsuccessful.
    """
    db_connection = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    f"Server={os.environ.get('SQLSERVER_HOST')},{os.environ.get('SQLSERVER_PORT')};"
    f"Database={os.environ.get('SQLSERVER_DB')};"
    f"Uid={os.environ.get('SQLSERVER_USER')};"
    f"Pwd={{{os.environ.get('SQLSERVER_PASSWORD')}}};"
    "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )

    cursor = db_connection.cursor()

    try:
        cursor.execute(f"""
                        SELECT * FROM customer_cash
                        WHERE username = '{username}'
                        """
                        )
        transactions = cursor.fetchall()
        transactions = [dict(zip([column[0] for column in cursor.description], row)) for row in transactions]

        for transaction in transactions:
            transaction["username"] = str.strip(transaction["username"])
            transaction["amount"] = float(transaction["amount"])
            transaction['date'] = transaction['date'].strftime("%Y-%m-%d")
            transaction['time'] = transaction['time'].strftime("%H:%M:%S")

        return transactions
    except Exception as e:
        print(" [x] Error: ", e)
        return None
    