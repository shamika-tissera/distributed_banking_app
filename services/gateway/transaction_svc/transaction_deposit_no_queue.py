from flask import jsonify
import requests
import pika
import json
import pyodbc
import os


connection = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    f"Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
    f"Database=distributed-systems-banking-app;"
    f"Uid=banking-app-admin;"
    "Pwd={16!7250%z2$X76&};"
    "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
)

def deposit(username, request, channel):
    
    request = request.get_json()
    
    amount = request["amount"]
    
    message = {
        "username": username,
        "amount": amount,
    }
    
    try:
        channel.basic_publish(
            exchange="",
            routing_key="deposit",
            body=json.dumps(message),
            properties= pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ),
        )
    except Exception as e:
        print(" [x] Error: ", e)
        return False, str(e)
    
    return True, None


def deposit_test(username, request, channel):
    request = request.get_json()
    
    amount = request["amount"]
    
    cursor = connection.cursor()
    try:
        cursor.execute(f"""
                        INSERT INTO customer_cash (username, amount, status, date, time)
                        VALUES ('{username}', {amount}, 'Complete', CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME))
                        """
                        )
        connection.commit()
        return True, None
    except Exception as e:
        print(" [x] Error: ", e)
        return False, str(e)
