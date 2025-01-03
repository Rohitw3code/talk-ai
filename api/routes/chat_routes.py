from flask import Blueprint, request, jsonify, Response, stream_with_context
from services.groq_service import GroqService
from services.pdf_service import PDFService
import os

chat_bp = Blueprint('chat', __name__)
groq_service = GroqService(api_key="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")
pdf_service = PDFService()

@chat_bp.route('/send', methods=['POST'])
def send_message():
    try:
        data = request.json
        message = data.get('message')
        pdf_path = data.get('pdfPath')
        
        if not message:
            return jsonify({'error': 'No message provided'}), 400
            
        # Get PDF content from cache if path is provided
        pdf_content = None
        if pdf_path:
            try:
                pdf_content = pdf_service.get_pdf_content(pdf_path)
            except FileNotFoundError as e:
                return jsonify({'error': str(e)}), 404
        
        def generate_response():
            for token in groq_service.get_chat_response(message, pdf_content):
                yield f"data: {token}\n\n"
                
        return Response(
            stream_with_context(generate_response()),
            content_type='text/event-stream'
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500