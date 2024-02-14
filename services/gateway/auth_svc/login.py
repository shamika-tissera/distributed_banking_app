import os, requests

def login(request):
    auth = request.get_json()
    
    if not auth:
        return None, ({"message": "No authorization provided"}, 401)
    
    response = requests.post(
        f"http://{os.environ.get('AUTH_SVC_ADDRESS')}/auth/login",
        json=request.get_json(),
        timeout=10
    )
    
    if response.status_code == 200:
        return response.json(), 200
    else:
        return None, response.status_code
