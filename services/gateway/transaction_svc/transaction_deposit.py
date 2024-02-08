from flask import jsonify
import requests

def deposit(request):
    
    response = requests.post(
        f"http://localhost:5000/transactions/deposit",
        json=request,
        timeout=10
    )

    if response.status_code == 200:
        return True, None, 200
    else:
        return False, response.json(), response.status_code
    