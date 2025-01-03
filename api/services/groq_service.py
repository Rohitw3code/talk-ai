from groq import Groq
from typing import Generator, Optional

class GroqService:
    def __init__(self, api_key: str):
        self.client = Groq(api_key=api_key)
    
    def get_chat_response(self, message: str, pdf_content: Optional[str] = None) -> Generator[str, None, None]:
        # Prepare the context with PDF content if available
        system_message = "You are a helpful AI assistant that can discuss documents and answer questions."
        context = f"Document content:\n{pdf_content}\n\nUser question:\n{message}" if pdf_content else message
        
        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": context}
        ]
        
        try:
            completion = self.client.chat.completions.create(
                model="llama2-70b-4096",
                messages=messages,
                temperature=0.7,
                max_tokens=1024,
                top_p=1,
                stream=True,
                stop=None
            )
            
            for chunk in completion:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            yield f"Error: {str(e)}"