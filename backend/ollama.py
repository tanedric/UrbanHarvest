from flask import Flask, request, jsonify
from flask_cors import CORS  # For cross-origin requests (if needed)
import ollama  # Import the Ollama library to run the model

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS if the frontend is on a different domain

# Initialize Ollama model
model_id = "your_model_id"  # Replace with your Ollama model ID

# Temporary in-memory storage for sentiments (use database for production)
sentiments_store = []

@app.route('/predict', methods=['POST'])
def predict():
    # Get the review text from the request
    review_data = request.json
    review_text = review_data['review']
    
    # Get sentiment prediction from Ollama model
    response = ollama.chat(model_id=model_id, messages=[{"role": "user", "content": review_text}])

    # Extract sentiment from Ollama's response
    sentiment = response['text'].strip()  # Assuming Ollama returns sentiment text
    
    # Store the sentiment temporarily (for short-term storage in memory)
    sentiments_store.append({
        "review": review_text,
        "sentiment": sentiment
    })

    # Return sentiment response
    return jsonify({"sentiment": sentiment}), 200

@app.route('/sentiments', methods=['GET'])
def get_sentiments():
    # Return all stored sentiments (You can replace this with a database for persistence)
    return jsonify(sentiments_store), 200

if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True, host="0.0.0.0", port=5000)
