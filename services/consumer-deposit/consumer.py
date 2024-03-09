import pika, sys, os, time, json
import pyodbc
from flask import jsonify, Flask, request

db_connection = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    f"Server=tcp:distributed-systems-banking-db.database.windows.net,1433;"
    f"Database=distributed-systems-banking-app;"
    f"Uid=banking-app-admin;"
    "Pwd={16!7250%z2$X76&};"
    "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
)

app = Flask(__name__)

app.route("/deposit", methods=["POST"])
def deposit():
    data = request.get_json()
    try:
        cursor = db_connection.cursor()
        cursor.execute(f"""
                        INSERT INTO customer_cash (username, amount, status, date, time)
                        VALUES ('{data['username']}', {data['amount']}, 'Complete', CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME))
                        """
                        )
        db_connection.commit()
        return jsonify({"message": "Deposit successful"}), 200
    except Exception as e:
        return jsonify({"message": f"Error: {e}"}), 500

# def main():
#     connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
#     channel = connection.channel()
#     # channel.queue_declare(queue='deposit')

#     def callback(ch, method, properties, body):
#         print(" [x] Received %r" % body)
#         message = json.loads(body)
#         try:
#             cursor = db_connection.cursor()
#             cursor.execute(f"""
#                             INSERT INTO customer_cash (username, amount, status, date, time)
#                             VALUES ('{message['username']}', {message['amount']}, 'Complete', CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME))
#                             """
#                             )
#             db_connection.commit()
#             print(" [x] Done")
#             ch.basic_ack(delivery_tag=method.delivery_tag)
#         except Exception as e:
#             print(" [x] Error: ", e)
#             ch.basic_nack(delivery_tag=method.delivery_tag)

#     channel.basic_consume(queue='deposit', on_message_callback=callback)

#     print(' [*] Waiting for messages. To exit press CTRL+C')
#     channel.start_consuming()
    
# if __name__ == '__main__':
#     try:
#         main()
#     except KeyboardInterrupt:
#         print('Interrupted')
#         try:
#             sys.exit(0)
#         except SystemExit:
#             os._exit(0)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
