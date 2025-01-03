// API configuration constants
export const API_BASE_URL = 'http://localhost:5000/api';  // Updated to Flask default port

// PDF endpoints
export const PDF_ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/pdf/upload`,
} as const;

// Upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_TYPES: ['application/pdf'],
} as const;