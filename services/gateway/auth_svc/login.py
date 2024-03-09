from flask import jsonify
import requests
import sys
import os 
import pyodbc
import logging
import bcrypt
import datetime
import jwt

# connection = pyodbc.connect(
#     "Driver={ODBC Driver 17 for SQL Server};"
#     f"Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
#     f"Database=distributed-systems-banking-app;"
#     f"Uid=banking-app-admin;"
#     "Pwd={16!7250%z2$X76&};"
#     "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
# )

def login(request):
    auth = request.get_json()
    
    if not auth:
        return None, ({"message": "No authorization provided"}, 401)
    
    response = requests.post(
        f"http://{os.environ.get('AUTH_SVC_ADDRESS')}/auth/login",
        json=request.get_json(),
        timeout=10
    )
    
    if response.status_code == 200:
        return response.json(), 200
    else:
        return None, response.status_code

def login_db(username: str, password: str) -> bool:
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    """Checks if the user is valid in the database"""
    cursor = db_connection.cursor()

    cursor.execute(f"""
                    SELECT password 
                    FROM users 
                    WHERE 
                        username = '{username}'
                        """
                    )
    try:
        hashed_password = cursor.fetchone()[0]
        # close the connection
        cursor.close()
        db_connection.close()
    except IndexError:
        logging.error("Cannot verify credentials for %s", username)
        return False
    except Exception as e:
        logging.error("An error occurred while verifying credentials for %s. Error: %s", username, e)
        return False
    
    if bcrypt.checkpw(bytes(password.encode()), bytes(hashed_password.strip().encode())):
        logging.info("%s logged in", username)
        return True
    else:
        logging.error("Credentials invalid for requested username: %s", username)
        return False

def login_svc(username, password):
    """
    Authenticates the user and generates a JWT token.

    Returns:
        JSON response: A JSON response containing the generated token if the authentication is successful.
            Otherwise, returns an error message with the appropriate status code.
    """
    
    is_valid_user = login_db(username, password)
    if not is_valid_user:
        return jsonify({"message": "Invalid credentials"}), 401
    else:
        logging.info("User {} logged in".format(username))
        token = jwt.encode({
            "user": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=120)
        }, "hftAs9zyQCf5",
            algorithm="HS256")
        return str(token), 200
    

def validate_token_svc(token):
    """
    Validates the given token.

    Returns:
        A JSON response with a message indicating the validity of the token.
    """
    try:
        _ = jwt.decode(token, "hftAs9zyQCf5", algorithms=["HS256"])
        
        # get the user from the token
        user = jwt.decode(token, "hftAs9zyQCf5", algorithms=["HS256"])["user"]
        
        return jsonify({"message": "Token is valid"}), 200, user
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401, None
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401, None
    except Exception as e:
        logging.error("An error occurred while validating the token. Error: %s", e)
        return jsonify({"message": "Internal failure"}), 500, None
