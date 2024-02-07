import sys
import os
import pyodbc
import logging
import bcrypt

sys.path.append(os.path.abspath('.'))
from services.auth.enums import RegisterUserInfo
import constants

connection = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    f"Server={constants.SQLSERVER_HOST};"
    f"Database={constants.SQLSERVER_DB};"
    "Trusted_Connection=yes;"
)

def is_valid_user(username: str) -> bool:
    """
    Check if the given username is a valid user in the database.

    Args:
        username (str): The username to be checked.

    Returns:
        bool: True if the username is valid, False otherwise.
    """
    cursor = connection.cursor()
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

def transactions_deposit(username: str, amount: float) -> bool:
    cursor = connection.cursor()
    cursor.execute(f"""
                    SELECT amount 
                    FROM customer_cash 
                    WHERE 
                        username = '{username}'
                        """
                    )
    try:
        _ = cursor.fetchone()[0]
    except TypeError:
        logging.error("Cannot verify balance for user %s", username)
        return False
    
    cursor.execute(f"""
                    UPDATE customer_cash
                    SET amount = amount + {amount}
                    WHERE 
                        username = '{username}'
                    """
                    )
    cursor.commit()
    return True