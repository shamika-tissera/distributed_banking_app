from flask import jsonify
import requests
import pika
import json

def deposit(request, channel):
    
    amount = request["amount"]
    
    message = {
        "username": "<username>",
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
    except:
        return False
    
    return True
    # response = requests.post(
    #     f"http://localhost:5000/transactions/deposit",
    #     json=request,
    #     timeout=10
    # )

    # if response.status_code == 200:
    #     return True, None, 200
    # else:
    #     return False, response.json(), response.status_code