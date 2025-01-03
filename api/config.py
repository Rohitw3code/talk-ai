import os
from pathlib import Path

class Config:
    # Base directory for the project
    BASE_DIR = Path(__file__).resolve().parent
    
    # Upload directory for PDFs
    UPLOAD_DIR = BASE_DIR / 'uploads'
    
    # Ensure upload directory exists
    UPLOAD_DIR.mkdir(exist_ok=True)
    
    # Maximum file size (10MB)
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'pdf'}