from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Add some predefined responses
GREETINGS = ["hello", "hi", "hey", "greetings"]
QUESTIONS = ["how are you", "how r u", "how are u"]
RESPONSES = {
    "greeting": [
        "Hello! How can I help you today?",
        "Hi there! Nice to hear from you!",
        "Hey! What's on your mind?",
        "Greetings! How may I assist you?"
    ],
    "how_are_you": [
        "I'm doing great, thanks for asking! How about you?",
        "I'm functioning perfectly! How's your day going?",
        "All systems operational! How are you today?",
        "I'm good! Thanks for checking in!"
    ],
    "default": [
        "That's interesting! Tell me more.",
        "I understand. Please continue...",
        "Interesting perspective! Would you like to elaborate?",
        f"I received your message. How can I help you further?",
        "Thanks for sharing that with me!"
    ]
}

@app.route('/')
def home():
    print("Home route accessed")
    return render_template('index.html')

@app.route('/api/message', methods=['POST'])
def handle_message():
    try:
        print("Message endpoint accessed")
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400
            
        user_message = data.get('message', '').lower().strip()
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        # Generate appropriate response based on user input
        response = get_response(user_message)
        
        print(f"Received: '{user_message}', Responding: '{response}'")
        return jsonify({"response": response})
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 500

def get_response(message):
    # Check for greetings
    if any(greeting in message for greeting in GREETINGS):
        return random.choice(RESPONSES["greeting"])
    
    # Check for "how are you" type questions
    if any(question in message for question in QUESTIONS):
        return random.choice(RESPONSES["how_are_you"])
    
    # Check for specific keywords and generate responses
    if "weather" in message:
        return "I don't have access to weather information, but I hope it's nice where you are!"
    elif "name" in message:
        return "I'm a simple server bot, nice to meet you!"
    elif "bye" in message or "goodbye" in message:
        return "Goodbye! Have a great day!"
    elif "thank" in message:
        return "You're welcome! Is there anything else I can help you with?"
    elif "?" in message:
        return "That's an interesting question! I'll do my best to help."
    
    # Default response if no specific matches
    return random.choice(RESPONSES["default"])

if __name__ == '__main__':
    print("Server starting on http://localhost:5000")
    app.run(debug=True) 