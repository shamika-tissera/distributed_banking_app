from flask import jsonify
import requests

def withdraw(request):
    """
    Withdraws funds from the user's account.

    Args:
        request (dict): The withdrawal request containing the necessary information.

    Returns:
        tuple: A tuple containing the success status, response data, and status code.
            - If the withdrawal is successful, the success status is True, response data is None, and status code is 200.
            - If the withdrawal fails, the success status is False, response data contains the error message, and status code is the error code.
    """
    response = requests.post(
        f"http://localhost:5002/transactions/withdraw",
        json=request,
        timeout=10
    )

    if response.status_code == 200:
        return True, None, 200
    else:
        return False, response.json(), response.status_code
    