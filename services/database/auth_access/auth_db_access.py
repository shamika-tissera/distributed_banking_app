import sys
import os
import pyodbc
import logging
import bcrypt

sys.path.append(os.path.abspath('.'))
import constants


connection = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    f"Server={constants.SQLSERVER_HOST};"
    f"Database={constants.SQLSERVER_DB};"
    "Trusted_Connection=yes;"
)

def get_password_hash(password: str) -> str:
    """Returns the hash of the password"""
    return password

def login(username: str, password: str) -> bool:
    """Checks if the user is valid in the database"""
    cursor = connection.cursor()

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
    
    if bcrypt.checkpw(bytes(password.encode()), bytes(hashed_password.strip().encode())):
        logging.info("%s logged in", username)
        return True
    else:
        logging.error("Credentials invalid for requested username: %s", username)
        return False
        
def register(username: str, password: str, email: str = None) -> bool:
    cursor = connection.cursor()
    
    
    