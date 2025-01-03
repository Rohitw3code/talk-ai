import { API_BASE_URL } from '../../config/api.config';
import { readFromFirebase, writeToFirebase } from '../firebase/database';

export async function sendMessage(message: string, pdfPath?: string): Promise<ReadableStream<Uint8Array> | null> {
  try {
    // If PDF path is provided, get the text content from Firebase
    let pdfContent = null;
    if (pdfPath) {
      const pdfData = await readFromFirebase(`pdf_texts/${btoa(pdfPath)}`);
      pdfContent = pdfData?.text;
    }

    const response = await fetch(`${API_BASE_URL}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message, 
        pdfPath,
        pdfContent // Include PDF content in the request
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    // Save chat message to Firebase
    await writeToFirebase(`chats/${Date.now()}`, {
      message,
      pdfPath,
      timestamp: new Date().toISOString()
    });

    return response.body;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to send message');
  }
}

export async function getChatHistory(): Promise<any[]> {
  try {
    const history = await readFromFirebase('chats');
    return history ? Object.values(history) : [];
  } catch (error) {
    console.error('Failed to get chat history:', error);
    return [];
  }
}