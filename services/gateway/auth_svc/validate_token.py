import requests

def validate_token(token) -> tuple:
    """
    Validates the given token by making a request to the authentication service.

    Args:
        token (str): The token to be validated.

    Returns:
        tuple: A tuple containing the validation result, error message (if any), and status code.
    """
    response = requests.post(
        f"http://localhost:5000/auth/validate-token",
        json={"token": token},
        timeout=10
    )
    
    if response.status_code == 200:
        return True, None, 200
    else:
        return False, response.json(), response.status_code
    