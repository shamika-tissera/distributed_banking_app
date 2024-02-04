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
        
def register(username: str, password: str, email: str = "") -> RegisterUserInfo:
    cursor = connection.cursor()
    salt = bcrypt.gensalt()
    try:
        cursor.execute("""
                    INSERT INTO users (username, password, email)
                    VALUES (?, ?, ?)
                """, (username, bcrypt.hashpw(bytes(password.encode()), salt).decode('UTF-8'), email))
    
        cursor.commit()
    except pyodbc.IntegrityError:
        logging.error("Username cannot be saved. Duplicate username.")        
        return RegisterUserInfo.USERNAME_UNAVAILABLE
    
    return RegisterUserInfo.SUCCESS
