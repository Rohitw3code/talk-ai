export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

export interface UploadError {
  message: string;
  code?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
}