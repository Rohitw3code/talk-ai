import { FILE_ENDPOINTS } from '../../config/api.config';

export function getImageUrl(filename: string): string {
  // Create a blob URL for faster loading
  return `${FILE_ENDPOINTS.VIEW}/${filename}`;
}

export function preloadImage(url: string): Promise<void> {
  console.log("image servic (url) : "+url);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}