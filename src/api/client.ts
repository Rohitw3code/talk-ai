const API_BASE_URL = 'https://planetai-dfemcqakf3afhkc8.canadacentral-01.azurewebsites.net';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Document {
  id: string;
  filename: string;
  upload_time: string;
  size: number;
  chunk_count: number;
}

export interface ChatMessage {
  id: string;
  user_message: string;
  ai_response: string;
  timestamp: string;
}

export interface UploadResponse {
  document_id: string;
  filename: string;
  upload_time: string;
  chunk_count: number;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  openai_configured: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  // Upload PDF file
  async uploadDocument(file: File): Promise<ApiResponse<UploadResponse>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  // Chat with document
  async chatWithDocument(
    documentId: string,
    message: string
  ): Promise<ApiResponse<ChatResponse>> {
    return this.request<ChatResponse>(`/chat/${documentId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Get chat history
  async getChatHistory(documentId: string): Promise<ApiResponse<{
    document_id: string;
    chat_history: ChatMessage[];
  }>> {
    return this.request(`/chat/${documentId}/history`);
  }

  // List all documents
  async listDocuments(): Promise<ApiResponse<{
    documents: Document[];
    total: number;
  }>> {
    return this.request('/documents');
  }

  // Delete document
  async deleteDocument(documentId: string): Promise<ApiResponse<{
    message: string;
  }>> {
    return this.request(`/documents/${documentId}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();