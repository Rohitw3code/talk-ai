from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from services.pdf_service import PDFService
from utils.file_handlers import save_uploaded_file
from config.config import Config
import requests
import os

file_bp = Blueprint('file', __name__)
pdf_service = PDFService()

# Firebase Realtime Database URL
FIREBASE_URL = "https://railseat-default-rtdb.asia-southeast1.firebasedatabase.app/talktoai"

session_id = 'test_id'

ALLOWED_EXTENSIONS = {'pdf', 'png', 'txt'}
MIME_TYPES = {
    'pdf': 'application/pdf',
    'png': 'image/png',
    'txt': 'text/plain'
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_image_to_imgbb(image_path):
    api_key = '2c81447fd0689e24302fc9e4c74773b6'
    with open(image_path, 'rb') as image_file:
        files = {'image': image_file}
        params = {'key': api_key}
        response = requests.post('https://api.imgbb.com/1/upload', files=files, params=params)

    if response.status_code == 200:
        response_json = response.json()
        print("Image uploaded successfully.")
        return response_json['data']['url']
    else:
        print("Failed to upload image.")
        raise Exception(f"ImgBB upload failed with status {response.status_code}: {response.text}")

@file_bp.route('/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        return handle_preflight()

    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if not file or not file.filename:
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400

        # Save the file securely
        filename = secure_filename(file.filename)
        file_path = os.path.join(Config.UPLOAD_DIR, filename)
        file.save(file_path)

        # Determine file type
        file_ext = filename.rsplit('.', 1)[1].lower()
        type_ = MIME_TYPES.get(file_ext, 'application/octet-stream')

        if type_ == 'application/pdf':
            # Process the PDF and extract text
            result = pdf_service.process_pdf(file_path)
            try:
                response = requests.put(f"{FIREBASE_URL}/{session_id}.json", json={'data': result['text']})
                if response.status_code != 200:
                    print('Failed to save data to Firebase.')
                else:
                    print("Data saved to Firebase.")
            except Exception as e:
                print(f'Firebase error: {str(e)}')

        elif type_ == 'image/png':
            print("PNG image uploaded.")
            if os.path.exists(file_path):
                # Upload the image to ImgBB
                image_url = upload_image_to_imgbb(file_path)
                print("Image URL:", image_url)
                os.remove(file_path)  # Remove the local file after upload
                response = requests.put(f"{FIREBASE_URL}/{session_id}.json", json={'image_url': image_url})
                if response.status_code != 200:
                    print('ImagUrl Updated')
                else:
                    print("Data saved to Firebase.")
            else:
                return jsonify({'error': 'Image file not saved correctly'}), 500

        # Build the response
        response = jsonify({
            'filename': filename,
            'url': f'/api/file/view/{filename}',
            'type': MIME_TYPES.get(file_ext, 'application/octet-stream'),
            'size': os.path.getsize(file_path) if os.path.exists(file_path) else None
        })
        add_cors_headers(response)
        return response, 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@file_bp.route('/view/<filename>')
def view_file(filename):
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
            max_age=3600  # Cache for 1 hour
        )
        add_cors_headers(response)
        return response

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

def handle_preflight():
    response = jsonify({'message': 'OK'})
    add_cors_headers(response)
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Cache-Control', 'public, max-age=3600')   