from groq import Groq
from typing import Generator, Optional
from model_config.models import DEFAULT_MODEL
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GroqService:
    def __init__(self, api_key: str):
        self.client = Groq(api_key=api_key)
        self.current_model = DEFAULT_MODEL

    def set_model(self, model_id: str):
        """Update the current model"""
        self.current_model = model_id
        logger.info(f"Model updated to: {model_id}")

    def get_chat_response(self, message: str, pdf_content: Optional[str] = None) -> Generator[str, None, None]:
        try:
            logger.info("Sending request to Groq:")
            logger.info(f"Message: {message}")
            logger.info(f"Using model: {self.current_model}")

            if pdf_content:
                logger.info("PDF content included in context")

            context = (
                f"Here is the content from the PDF document:\n\n{pdf_content}\n\n"
                f"Based on this document, please answer the following question:\n{message}"
            ) if pdf_content else message

            messages = [
                {
                    "role": "system",
                    "content": (
                        "You are a helpful AI assistant specialized in analyzing documents "
                        "and answering questions about their content. Provide clear, "
                        "accurate responses based on the document content when available."
                    )
                },
                {"role": "user", "content": context}
            ]

            completion = self.client.chat.completions.create(
                model=self.current_model,
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
            logger.error(f"Groq API error: {str(e)}")
            yield f"Error: {str(e)}"

    def get_vision_response(self, message: str, image_url: str) -> str:
        """Handle requests to the Groq Vision model."""
        try:
            logger.info("Sending request to Groq Vision model:")
            logger.info(f"Message: {message}")
            logger.info(f"Image URL: {image_url}")

            messages = [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": message},
                        {"type": "image_url", "image_url": {"url": image_url}}
                    ]
                }
            ]

            completion = self.client.chat.completions.create(
                model="llama-3.2-11b-vision-preview",
                messages=messages,
                temperature=1,
                max_tokens=1024,
                top_p=1,
                stream=False,
                stop=None,
            )

            response = completion.choices[0].message.content
            logger.info("Groq Vision response received")
            return response

        except Exception as e:
            logger.error(f"Groq Vision API error: {str(e)}")
            return f"Error: {str(e)}"

# Create a singleton instance with your API key
groq_service = GroqService(api_key="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")

# # Example usage of the vision method
# response = groq_service.get_vision_response(
#     message="What's in this image?",
#     image_url="https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg"
# )
# print(response)
