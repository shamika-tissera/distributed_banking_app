import sys
import os 
import pyodbc
import logging
import bcrypt

sys.path.append(os.path.abspath('.'))
from enums import RegisterUserInfo

# db_connection = pyodbc.connect(
#         "Driver={ODBC Driver 17 for SQL Server};"
#         "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
#         "Database=distributed-systems-banking-app;"
#         "Uid=banking-app-admin;"
#         "Pwd={16!7250%z2$X76&};"
#         "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
# )

def login(username: str, password: str) -> bool:
    """Checks if the user is valid in the database"""
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
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
        
def register(username: str, password: str, email: str = "") -> RegisterUserInfo:
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    cursor = db_connection.cursor()
    salt = bcrypt.gensalt()
    try:
        
        # create transaction to insert user into the database and set the user's initial balance to 0
        cursor.execute("""
                        BEGIN TRANSACTION

                        INSERT INTO users (username, password, email)
                        VALUES (?, ?, ?)
                    """, (username, bcrypt.hashpw(bytes(password.encode()), salt).decode('UTF-8'), email))
        cursor.execute("""
                        INSERT INTO customer_cash (username, amount)
                        VALUES (?, ?)
                    """, (username, 0))
        cursor.commit()
        
    except pyodbc.IntegrityError:
        logging.error("Username cannot be saved. Duplicate username.")        
        return RegisterUserInfo.USERNAME_UNAVAILABLE
    
    except Exception as e:
        logging.error("An error occurred while setting initial balance for user %s. Error: %s", username, e)
        # Rollback the user registration
        cursor.execute("ROLLBACK TRANSACTION")
        return RegisterUserInfo.INTERNAL_FAILIURE
    return RegisterUserInfo.SUCCESS

def is_valid_user(username: str) -> bool:
    db_connection = pyodbc.connect(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
        "Database=distributed-systems-banking-app;"
        "Uid=banking-app-admin;"
        "Pwd={16!7250%z2$X76&};"
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    cursor = db_connection.cursor()
    cursor.execute(f"""
                    SELECT username 
                    FROM users 
                    WHERE 
                        username = '{username}'
                        """
                    )
    try:
        cursor.fetchone()[0]
        return True
    except TypeError:
        return False
    except pyodbc.ProgrammingError:
        logging.error("Cannot verify user %s", username)
        return False
    except Exception as e:
        logging.error("An error occurred while verifying user %s. Error: %s", username, e)
        return False
