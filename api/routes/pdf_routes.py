from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.pdf_service import PDFService
from utils.validators import allowed_file
import requests

pdf_bp = Blueprint('pdf', __name__)
pdf_service = PDFService()

# Firebase Realtime Database URL
FIREBASE_URL = "https://railseat-default-rtdb.asia-southeast1.firebasedatabase.app/talktoai/pdf-data1"
session_id = 'test_id'

@pdf_bp.route('/upload', methods=['POST'])
def upload_pdf():
    print("hello upload")
    try:
        # Check if file is present in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        
        # Check if file was selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        # Validate file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file format. Only PDF files are allowed'}), 400
            
        # Process the PDF and extract text
        result = pdf_service.process_pdf(file)

        
        # Save extracted text to Firebase
        try:
            response = requests.put(f"{FIREBASE_URL}/{session_id}.json", json={'data': result['text']})
            if response.status_code != 200:
                return jsonify({'error': 'Failed to save to Firebase'}), 500
            else:
                print("Saved the data on firebase")
        except Exception as e:
            return jsonify({'error': f'Firebase error: {str(e)}'}), 500
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500