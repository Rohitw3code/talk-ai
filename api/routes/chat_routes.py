from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.groq_service import GroqService
import logging
import requests
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Blueprint and Service
chat_bp = Blueprint('chat', __name__)
groq_service = GroqService(api_key="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")

# Firebase Configuration
FIREBASE_URL = "https://railseat-default-rtdb.asia-southeast1.firebasedatabase.app/talktoai"
SESSION_ID = 'test_id'

# Helper Functions
def fetch_firebase_data():
    """Fetch data from Firebase Realtime Database."""
    try:
        response = requests.get(f"{FIREBASE_URL}/{SESSION_ID}.json")
        if response.status_code == 200:
            return response.json()
        logger.error(f"Failed to retrieve Firebase data: {response.status_code}")
    except requests.RequestException as e:
        logger.error(f"Error fetching Firebase data: {str(e)}")
    return None

def process_vision_response(message, image_url):
    """Generate response using Groq Vision model."""
    try:
        response_data = groq_service.get_vision_response(message, image_url)
        chunk_size = 50
        for i in range(0, len(response_data), chunk_size):
            yield f"data: {response_data[i:i + chunk_size]}\n\n"
    except Exception as e:
        logger.error(f"Error with Groq Vision model: {str(e)}")
        yield f"data: Error processing image: {str(e)}\n\n"

def process_chat_response(message, pdf_content):
    """Stream response using Groq Chat model."""
    try:
        for token in groq_service.get_chat_response(message, pdf_content):
            yield f"data: {token}\n\n"
    except Exception as e:
        logger.error(f"Error with Groq Chat model: {str(e)}")
        yield f"data: Error: {str(e)}\n\n"

# Route Handlers
@chat_bp.route('/send', methods=['POST'])
def send_message():
    """Handle incoming chat requests."""
    try:
        data = request.json
        message = data.get('message')
        path = data.get('path')

        if not message:
            return jsonify({'error': 'No message provided'}), 400

        logger.info(f"Received chat request - Message: {message} | Path: {path}")

        @stream_with_context
        def generate_response():
            firebase_data = fetch_firebase_data()

            if not firebase_data:
                yield "data: Error: Unable to fetch Firebase data\n\n"
                return

            if path and path.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                logger.info("Processing image using Groq Vision model.")
                image_url = firebase_data.get('image_url')

                if image_url:
                    yield from process_vision_response(message, image_url)
                else:
                    logger.warning("No Image URL found in Firebase.")
                    yield "data: Error: No image URL found\n\n"
            else:
                logger.info("Processing chat request with PDF content.")
                pdf_content = firebase_data.get('data')

                if pdf_content:
                    yield from process_chat_response(message, pdf_content)
                else:
                    logger.warning("No PDF content found in Firebase.")
                    yield "data: Error: No PDF content found\n\n"

        return Response(generate_response(), content_type='text/event-stream')

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500
