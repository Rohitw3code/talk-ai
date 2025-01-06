import { API_BASE_URL } from '../../config/api.config';

export async function sendMessage(message: string, path?: string): Promise<ReadableStream<Uint8Array> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, path }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.body;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to send message');
  }
}