import sys, os

from flask_mysqldb import MySQL
sys.path.append(os.path.abspath('.'))

from services.auth.server import app

mysql = MySQL(app)

def login(username: str, password: str):
    print(app.config["MYSQL_HOST"])
    