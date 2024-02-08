import requests

def validate_token(token) -> tuple:
    response = requests.post(
        f"http://localhost:5000/auth/validate-token",
        json={"token": token},
        timeout=10
    )
    
    if response.status_code == 200:
        return True, None, 200
    else:
        return False, response.json(), response.status_code
    