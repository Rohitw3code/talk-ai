import { writeToFirebase, readFromFirebase } from '../firebase/database';
import type { ExtractTextResponse } from './types';

export async function extractPDFText(filepath: string): Promise<ExtractTextResponse> {
  try {
    // First check if we already have the text in Firebase
    const cachedText = await readFromFirebase(`pdf_texts/${btoa(filepath)}`);
    if (cachedText) {
      return { text: cachedText.text };
    }

    // If not in cache, extract from PDF
    const response = await fetch(`${PDF_ENDPOINTS.EXTRACT_TEXT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filepath }),
    });

    if (!response.ok) {
      throw new Error('Failed to extract text from PDF');
    }

    const extractedData = await response.json();

    // Save to Firebase
    await writeToFirebase(`pdf_texts/${btoa(filepath)}`, {
      text: extractedData.text,
      timestamp: new Date().toISOString()
    });

    return extractedData;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Text extraction failed');
  }
}