from flask import Blueprint, request, jsonify, send_file, current_app
from werkzeug.utils import secure_filename
import os
from utils.file_handlers import save_uploaded_file, get_file_content
from config.config import Config

file_bp = Blueprint('file', __name__)

ALLOWED_EXTENSIONS = {'pdf', 'png', 'txt'}
MIME_TYPES = {
    'pdf': 'application/pdf',
    'png': 'image/png',
    'txt': 'text/plain'
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

        filename = save_uploaded_file(file, Config.UPLOAD_DIR)
        file_ext = filename.rsplit('.', 1)[1].lower()
        
        response = jsonify({
            'filename': filename,
            'url': f'/api/file/view/{filename}',
            'type': MIME_TYPES.get(file_ext, 'application/octet-stream'),
            'size': os.path.getsize(os.path.join(Config.UPLOAD_DIR, filename))
        })
        add_cors_headers(response)
        return response, 200
        
    except Exception as e:
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