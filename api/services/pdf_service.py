import logging
from pathlib import Path
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from config import Config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PDFService:
    def process_pdf(self, file):
        """
        Process uploaded PDF file:
        1. Save the file
        2. Extract text
        3. Log the content
        4. Return file info
        """
        try:
            # Secure the filename and create save path
            filename = secure_filename(file.filename)
            filepath = Path(Config.UPLOAD_DIR) / filename
            
            # Save the file
            file.save(filepath)
            logger.info(f"File saved: {filepath}")
            
            # Extract text from PDF
            text_content = self._extract_text(filepath)
            
            # Log the extracted text
            logger.info(f"Extracted text from {filename}:")
            logger.info(text_content[:500] + "..." if len(text_content) > 500 else text_content)
            
            return {
                'success': True,
                'filepath': str(filepath),
                'filename': filename,
                'size': filepath.stat().st_size
            }
            
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            raise
            
    def _extract_text(self, filepath: Path) -> str:
        """Extract text content from PDF file"""
        text = ""
        with open(filepath, 'rb') as file:
            pdf = PdfReader(file)
            for page in pdf.pages:
                text += page.extract_text() or ""
        return text