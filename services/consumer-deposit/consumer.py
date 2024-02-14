import pika, sys, os, time, json
import pyodbc

db_connection = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    f"Server={os.environ.get('SQLSERVER_HOST')},{os.environ.get('SQLSERVER_PORT')};"
    f"Database={os.environ.get('SQLSERVER_DB')};"
    f"Uid={os.environ.get('SQLSERVER_USER')};"
    f"Pwd={{{os.environ.get('SQLSERVER_PASSWORD')}}};"
    "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
)

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    # channel.queue_declare(queue='deposit')

    def callback(ch, method, properties, body):
        print(" [x] Received %r" % body)
        message = json.loads(body)
        try:
            cursor = db_connection.cursor()
            cursor.execute(f"""
                            INSERT INTO customer_cash (username, amount)
                            VALUES ('{message['username']}', {message['amount']})
                            """
                            )
            db_connection.commit()
            print(" [x] Done")
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(" [x] Error: ", e)
            ch.basic_nack(delivery_tag=method.delivery_tag)

    channel.basic_consume(queue='deposit', on_message_callback=callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
    
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
