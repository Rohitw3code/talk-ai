from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.groq_service import GroqService
import logging
import requests
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

chat_bp = Blueprint('chat', __name__)
groq_service = GroqService(
    api_key="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")

# Firebase Realtime Database URL
FIREBASE_URL = "https://railseat-default-rtdb.asia-southeast1.firebasedatabase.app/talktoai"
session_id = 'test_id'

@chat_bp.route('/send', methods=['POST'])
def send_message():
    try:
        data = request.json
        message = data.get('message')
        path = data.get('path')

        print("path : ",path)

        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Log incoming request
        logger.info(f"Received chat request - Message: {message} | PDF Path: {path}")

        def generate_response():
            # Check if the path is an image
            if path and path.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                logger.info("Image file detected. Using Groq Vision model.")
                response = requests.get(f"{FIREBASE_URL}/{session_id}.json")
                pdf_content = None
                if response.status_code == 200:
                    firebase_data = response.json()
                    image_url = firebase_data.get('image_url')
                    if image_url:
                        logger.info("Successfully retrieved Image Url content from Firebase")
                    else:
                        logger.warning("No Image Url found in Firebase")
                else:
                    logger.error(f"Failed to retrieve from Firebase: {response.status_code}")

                try:
                    response_data = groq_service.get_vision_response(message, image_url)
                    # Stream the vision model response in chunks
                    chunk_size = 50  # Adjust chunk size as needed
                    for i in range(0, len(response_data), chunk_size):
                        chunk = response_data[i:i + chunk_size]
                        yield f"data: {chunk}\n\n"
                except Exception as e:
                    logger.error(f"Error with Groq Vision model: {str(e)}")
                    yield f"data: Error processing image: {str(e)}\n\n"
                return

            # Handle PDF content
            try:
                logger.info("Retrieving PDF content from Firebase")
                response = requests.get(f"{FIREBASE_URL}/{session_id}.json")
                pdf_content = None
                if response.status_code == 200:
                    firebase_data = response.json()
                    pdf_content = firebase_data.get('data')
                    if pdf_content:
                        logger.info("Successfully retrieved PDF content from Firebase")
                    else:
                        logger.warning("No PDF content found in Firebase")
                else:
                    logger.error(f"Failed to retrieve from Firebase: {response.status_code}")

                # Stream regular chat response
                for token in groq_service.get_chat_response(message, pdf_content):
                    yield f"data: {token}\n\n"

            except Exception as e:
                logger.error(f"Error processing request: {str(e)}")
                yield f"data: Error: {str(e)}\n\n"

        return Response(
            stream_with_context(generate_response()),
            content_type='text/event-stream'
        )

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500