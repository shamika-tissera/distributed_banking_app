import sys, os

import mysql.connector
sys.path.append(os.path.abspath('.'))

import constants

db = mysql.connector.connect(
    host=constants.MYSQL_HOST,
    user=constants.MYSQL_USER,
    password=constants.MYSQL_PASSWORD,
    database=constants.MYSQL_DB,
    port=constants.MYSQL_PORT
)

def login(username: str, password: str) -> bool:
    cursor = db.cursor()
    cursor.execute("""
                    SELECT * 
                    FROM users 
                    WHERE 
                        username = %s 
                    AND 
                        password = %s
                        """,
                        (username, password)
                    )
    result = cursor.fetchone()
    if result:
        return True
    else:
        return False
    