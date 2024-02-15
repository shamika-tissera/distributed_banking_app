from typing import Optional
from flask import jsonify
import requests
import pika
import json
import uuid
import time

def get_account_balance(username, channel):
    """
    Get the account balance of the user.

    Args:
        username: The username of the user.
        channel: The channel to the message broker.

    Returns:
        A JSON response with the account balance if the request is successful.
        A JSON response with an error message if the request is unsuccessful.
    """
    message = {
        "message_id": str(uuid.uuid4()),
        "username": username,
    }

    try:
        channel.basic_publish(
            exchange="",
            routing_key="check_balance_requests",
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ),
        )
    except Exception as e:
        print(" [x] Error: ", e)
        return False, str(e), None

    return True, None, message["message_id"]

def get_account_balance_response(message_id) -> Optional[int]:
    """
    Get the account balance response from the message broker.

    Args:
        message_id: The message ID of the request.

    Returns:
        A JSON response with the account balance if the request is successful.
        A JSON response with an error message if the request is unsuccessful.
    """
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()

    current_time = time.time()
    timeout = 10
    timeout_time = current_time + timeout
    
    def callback(ch, method, properties, body):
        response = json.loads(body)
        if response["message_id"] == message_id:
            print(" [x] Received %r" % response)
            connection.close()
            return response["balance"]
        else:
            print(" [x] Invalid message ID")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True) # Reject the message and put it back in the queue

        if time.time() > timeout_time:
            print(" [x] Timeout")
            connection.close()
            return None
        
    channel.basic_consume(queue="check_balance_responses", on_message_callback=callback)
    channel.start_consuming()
