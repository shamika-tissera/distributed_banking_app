from flask import jsonify
import requests
import pika
import json

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
