import { FIREBASE_CONFIG } from './config';

export async function writeToFirebase(path: string, data: any): Promise<void> {
  try {
    const response = await fetch(`${FIREBASE_CONFIG.databaseURL}/${path}.json`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to write data: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Firebase write error:', error);
    throw error;
  }
}

export async function readFromFirebase(path: string): Promise<any> {
  try {
    const response = await fetch(`${FIREBASE_CONFIG.databaseURL}/${path}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to read data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Firebase read error:', error);
    throw error;
  }
}