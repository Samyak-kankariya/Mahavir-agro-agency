import requests

BASE_URL = "http://127.0.0.1:5000"

def test_chatbot():
    payload = {"message": "What fertilizers do you offer?"}
    response = requests.post(f"{BASE_URL}/chat", json=payload)
    
    print("Status Code:", response.status_code)
    print("Response:", response.json())

if __name__ == "__main__":
    test_chatbot()
