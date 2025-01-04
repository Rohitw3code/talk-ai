import { UPLOAD_CONSTRAINTS } from '../../config/api.config';

export function validatePDFFile(file: File): string | null {
  // Check file size
  if (file.size > UPLOAD_CONSTRAINTS.MAX_FILE_SIZE) {
    return 'File size exceeds 10MB limit';
  }

  // Check file type
  if (!UPLOAD_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
    return `Invalid file type. Only ${UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.join(', ').toUpperCase()} files are allowed`;
  }

  // Check file extension
  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  if (!UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.includes(fileExtension)) {
    return `Invalid file extension. Only ${UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.join(', ').toUpperCase()} files are allowed`;
  }

  return null;
}