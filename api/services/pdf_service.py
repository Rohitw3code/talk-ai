import logging
from pathlib import Path
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from config import Config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PDFService:
    def __init__(self):
        self._processed_pdfs = {}  # Cache for processed PDFs
        
    def process_pdf(self, file):
        """
        Process uploaded PDF file:
        1. Save the file
        2. Extract text
        3. Cache the content
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
            
            # Cache the extracted text
            self._processed_pdfs[str(filepath)] = text_content
            
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
        
    def get_pdf_content(self, filepath: str) -> str:
        """Get cached PDF content or extract if not cached"""
        if filepath not in self._processed_pdfs:
            # If PDF was processed in a previous session, extract again
            if Path(filepath).exists():
                self._processed_pdfs[filepath] = self._extract_text(Path(filepath))
            else:
                raise FileNotFoundError(f"PDF file not found: {filepath}")
                
        return self._processed_pdfs[filepath]