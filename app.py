from flask import Flask, render_template, request
import pymysql

app = Flask(__name__)

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'Mengineering18'
DB_NAME = 'bankingapp'


def connect_to_database():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)


@app.route('/')
def form():
    return render_template('form.html')


@app.route('/submit', methods=['POST'])
def submit():
    # Get form data
    transaction_amount = request.form['transactionAmount']
    beneficiary_name = request.form['beneficiaryName']
    beneficiary_reference = request.form['beneficiaryReference']
    beneficiary_account_no = request.form['beneficiaryAccountNo']
    transaction_purpose = request.form['transactionPurpose']
    bank_name = request.form['bankName']

    # Insert data into MySQL database
    try:
        connection = connect_to_database()
        with connection.cursor() as cursor:
            sql = "INSERT INTO transactiondetails (amount, beneficiary_name, beneficiary_reference, beneficiary_account_no, transaction_purpose, bank_name) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (transaction_amount, beneficiary_name, beneficiary_reference,
                           beneficiary_account_no, transaction_purpose, bank_name))
        connection.commit()
    except Exception as e:
        print("Error:", e)
    finally:
        connection.close()

    return "Form submitted successfully!"
