from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.groq_service import GroqService
import logging
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

chat_bp = Blueprint('chat', __name__)
groq_service = GroqService(api_key="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")

# Firebase Realtime Database URL
FIREBASE_URL = "https://railseat-default-rtdb.asia-southeast1.firebasedatabase.app/talktoai/pdf-data"

@chat_bp.route('/send', methods=['POST'])
def send_message():
    try:
        data = request.json
        message = data.get('message')
        pdf_path = data.get('pdfPath')
        
        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Log incoming request
        logger.info(f"Received chat request - Message: {message} {pdf_path}")
        
        # Get PDF content from Firebase if path is provided
        pdf_content = None
        logger.info(f"Retrieving PDF content from Firebase")
        try:
            response = requests.get(f"{FIREBASE_URL}.json")
            if response.status_code == 200:
                firebase_data = response.json()
                if firebase_data and 'data' in firebase_data:
                    pdf_content = firebase_data['data']
                    logger.info("Successfully retrieved PDF content from Firebase")
                else:
                    logger.warning("No PDF content found in Firebase")
            else:
                logger.error(f"Failed to retrieve from Firebase: {response.status_code}")
        except Exception as e:
            logger.error(f"Firebase error: {str(e)}")
            return jsonify({'error': 'Failed to retrieve PDF content'}), 500
        
        def generate_response():
            for token in groq_service.get_chat_response(message, pdf_content):
                yield f"data: {token}\n\n"
                
        return Response(
            stream_with_context(generate_response()),
            content_type='text/event-stream'
        )
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500