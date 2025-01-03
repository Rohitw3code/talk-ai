import { PDF_ENDPOINTS } from '../../config/api.config';
import type { ExtractTextResponse } from './types';

export async function extractPDFText(filepath: string): Promise<ExtractTextResponse> {
  try {
    const response = await fetch(PDF_ENDPOINTS.EXTRACT_TEXT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filepath }),
    });

    if (!response.ok) {
      throw new Error('Failed to extract text from PDF');
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Text extraction failed');
  }
}