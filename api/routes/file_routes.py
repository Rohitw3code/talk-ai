from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from services.pdf_service import PDFService
from utils.file_handlers import save_uploaded_file
from config.config import Config
import requests
import os

# Blueprint for file-related endpoints
file_bp = Blueprint('file', __name__)
pdf_service = PDFService()

# Firebase Realtime Database Configuration
FIREBASE_URL = "https://railseat-default-rtdb.asia-southeast1.firebasedatabase.app/talktoai"
session_id = 'test_id'

# Allowed file extensions and MIME types
ALLOWED_EXTENSIONS = {'pdf', 'png', 'txt'}
MIME_TYPES = {
    'pdf': 'application/pdf',
    'png': 'image/png',
    'txt': 'text/plain'
}

# Helper Functions

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_image_to_imgbb(image_path):
    """Upload an image to ImgBB and return the image URL."""
    api_key = '2c81447fd0689e24302fc9e4c74773b6'
    try:
        with open(image_path, 'rb') as image_file:
            files = {'image': image_file}
            params = {'key': api_key}
            response = requests.post('https://api.imgbb.com/1/upload', files=files, params=params)

        if response.status_code == 200:
            return response.json()['data']['url']
        else:
            raise Exception(f"ImgBB upload failed: {response.text}")
    except Exception as e:
        raise Exception(f"Error uploading to ImgBB: {str(e)}")

# Route Handlers

@file_bp.route('/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    """Handle file upload requests."""
    if request.method == 'OPTIONS':
        return handle_preflight()

    try:
        # Validate file presence
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if not file or not file.filename:
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        # Securely save the file
        filename = secure_filename(file.filename)
        file_path = os.path.join(Config.UPLOAD_DIR, filename)
        file.save(file_path)

        # Determine file type and process accordingly
        file_ext = filename.rsplit('.', 1)[1].lower()
        file_type = MIME_TYPES.get(file_ext, 'application/octet-stream')

        if file_type == 'application/pdf':
            # Process PDF and save text to Firebase
            result = pdf_service.process_pdf(file_path)
            save_to_firebase({'data': result['text']})
        elif file_type == 'image/png':
            # Upload image to ImgBB and save URL to Firebase
            image_url = upload_image_to_imgbb(file_path)
            save_to_firebase({'image_url': image_url})

        # Prepare response
        response = jsonify({
            'filename': filename,
            'url': f'/api/file/view/{filename}',
            'type': file_type,
            'size': os.path.getsize(file_path) if os.path.exists(file_path) else None
        })
        add_cors_headers(response)
        return response, 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@file_bp.route('/view/<filename>')
def view_file(filename):
    """Serve a file for viewing."""
    try:
        if not allowed_file(filename):
            return jsonify({'error': 'Invalid file type'}), 400

        file_path = os.path.join(Config.UPLOAD_DIR, secure_filename(filename))
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404

        file_ext = filename.rsplit('.', 1)[1].lower()

        response = send_file(
            file_path,
            mimetype=MIME_TYPES.get(file_ext, 'application/octet-stream'),
            as_attachment=False,
            max_age=3600
        )
        add_cors_headers(response)
        return response

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Utility Functions

def save_to_firebase(data):
    """Save data to Firebase Realtime Database."""
    try:
        response = requests.put(f"{FIREBASE_URL}/{session_id}.json", json=data)
        if response.status_code != 200:
            raise Exception(f"Failed to save to Firebase: {response.text}")
    except Exception as e:
        raise Exception(f"Firebase error: {str(e)}")

def handle_preflight():
    """Handle CORS preflight requests."""
    response = jsonify({'message': 'OK'})
    add_cors_headers(response)
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

def add_cors_headers(response):
    """Add CORS headers to the response."""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Cache-Control', 'public, max-age=3600')
