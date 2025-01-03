import { API_BASE_URL } from '../../config/api.config';
import { Model } from '../../components/chat/models/types';

interface ModelResponse {
  message: string;
  modelId: string;
}

export class ModelError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModelError';
  }
}

export async function setSelectedModel(modelId: string): Promise<ModelResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/model/selected-model`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ModelError(errorData.error || 'Failed to update model');
    }

    const data: ModelResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ModelError) {
      throw error;
    }
    throw new ModelError('Failed to connect to model service');
  }
}