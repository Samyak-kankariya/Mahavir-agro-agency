import google.generativeai as genai
import os

# Load API key
GEMINI_API_KEY = "your_google_gemini_api_key" 
genai.configure(api_key=GEMINI_API_KEY)

# List available models
models = genai.list_models()
for model in models:
    print(model.name)
