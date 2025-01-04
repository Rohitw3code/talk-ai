// API configuration constants
export const API_BASE_URL = 'http://localhost:5000/api';  // Updated to Flask default port

// File endpoints
export const FILE_ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/file/upload`,
  VIEW: `${API_BASE_URL}/file/view`,
} as const;

// Upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_TYPES: ['application/pdf', 'image/png', 'text/plain'],
  ALLOWED_EXTENSIONS: ['.pdf', '.png', '.txt']
} as const;