import { UPLOAD_CONSTRAINTS } from '../../config/api.config';

export function validatePDFFile(file: File): string | null {
  // Check file size
  if (file.size > UPLOAD_CONSTRAINTS.MAX_FILE_SIZE) {
    return 'File size exceeds 10MB limit';
  }

  // Check file type
  if (!UPLOAD_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
    return 'Invalid file type. Only PDF files are allowed';
  }

  return null;
}