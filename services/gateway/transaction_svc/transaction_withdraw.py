from flask import jsonify
import requests

def withdraw(request):
    
    response = requests.post(
        f"http://localhost:5002/transactions/withdraw",
        json=request,
        timeout=10
    )

    if response.status_code == 200:
        return True, None, 200
    else:
        return False, response.json(), response.status_code
    