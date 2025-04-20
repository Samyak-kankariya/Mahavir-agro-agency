from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables from .env (only for local environment)
load_dotenv()  # This will load .env file only in local environment

# Check if the environment is production or development
is_production = os.getenv("FLASK_ENV") == "production"

# If we are in production, the API key should already be in Render's environment variables.
api_key = os.getenv("GEMINI_API_KEY") if not is_production else os.environ.get("GEMINI_API_KEY")

# Configure Google Gemini API
genai.configure(api_key=api_key)

# Define the Flask app
app = Flask(__name__)
CORS(app)

if os.environ.get("FLASK_ENV") != "production":
    load_dotenv()
    print("🔧 Local .env loaded")

# Home Route (Fixes 404 Error)
@app.route("/")
def home():
    return "Chatbot API is running! Send a POST request to /chat."

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    if not user_message:
        return jsonify({"response": "Please type a message."})

    try:
       print("📨 Received message:", user_message)
       print("🔑 Gemini key loaded:", api_key is not None)
       
       model = genai.GenerativeModel("models/gemini-1.5-pro")
       response = model.generate_content(user_message)
       return jsonify({"response": response.text})

    except Exception as e:
        print("🔥 Chatbot error:", str(e))  # ← This will help us see the real issue
        return jsonify({"response": f"Error: {str(e)}"})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)