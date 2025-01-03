from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.pdf_service import PDFService
from utils.validators import allowed_file

pdf_bp = Blueprint('pdf', __name__)
pdf_service = PDFService()

@pdf_bp.route('/upload', methods=['POST'])
def upload_pdf():
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
            
        # Process and store the PDF
        result = pdf_service.process_pdf(file)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500