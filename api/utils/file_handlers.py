"""Utility functions for handling different file types"""
import os
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader

def save_uploaded_file(file, upload_dir):
    """Save uploaded file and return secure filename"""
    filename = secure_filename(file.filename)
    filepath = os.path.join(upload_dir, filename)
    file.save(filepath)
    return filename

def get_file_content(file, file_type):
    """Extract content based on file type"""
    if file_type == 'pdf':
        return extract_pdf_content(file)
    elif file_type == 'txt':
        return file.read().decode('utf-8')
    return None  # For images, no content extraction needed

def extract_pdf_content(file):
    """Extract text content from PDF"""
    pdf = PdfReader(file)
    text = ""
    for page in pdf.pages:
        text += page.extract_text() or ""
    return text