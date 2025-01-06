import logging
from pathlib import Path
from PyPDF2 import PdfReader
from typing import Optional, Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PDFService:
    def process_pdf(self, file) -> Dict:
        """Process PDF file and return extracted text"""
        try:
            text = ""
            pdf = PdfReader(file)
            for page in pdf.pages:
                text += page.extract_text() or ""

            # Log extracted text
            logger.info("Extracted PDF Text:")
            logger.info("-" * 50)
            logger.info(text)
            logger.info("-" * 50)

            print("pdf_service : file ",file)

            return {
                'text': text,
                'filename': file,
                'pages': len(pdf.pages)
            }

        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            raise Exception("Failed to process PDF file")