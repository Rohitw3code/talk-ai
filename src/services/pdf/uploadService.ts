import { PDF_ENDPOINTS } from '../../config/api.config';
import { validatePDFFile } from './validators';
import type { UploadResponse, UploadError, UploadProgress } from './types';

interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
}

export async function uploadPDF(file: File, options?: UploadOptions): Promise<UploadResponse> {
  // Validate file before upload
  const validationError = validatePDFFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);

  try {
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      if (options?.onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            options.onProgress?.({
              loaded: event.loaded,
              total: event.total
            });
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve({
              url: response.url,
              filename: response.filename,
              size: response.size
            });
          } catch (error) {
            reject(new Error('Invalid response format'));
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText) as UploadError;
            reject(new Error(error.message || 'Upload failed'));
          } catch {
            reject(new Error('Upload failed'));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error occurred. Please check if the server is running.'));
      };

      xhr.open('POST', PDF_ENDPOINTS.UPLOAD);
      xhr.send(formData);
    });
  } catch (error) {
    throw error instanceof Error ? error : new Error('Upload failed');
  }
}