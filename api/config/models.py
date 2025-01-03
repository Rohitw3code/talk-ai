"""
Configuration for AI models
"""

MODELS = {
    'gemma': {
        'id': 'gemma2-9b-it',
        'name': 'Gemma 2 9B',
        'context_length': 8192
    },
    'llama_tool': {
        'id': 'llama3-groq-70b-8192-tool-use-preview',
        'name': 'LLaMA 3 70B Tool Use',
        'context_length': 8192
    },
    'llama_vision': {
        'id': 'llama-3.2-90b-vision-preview',
        'name': 'LLaMA 3.2 90B Vision',
        'context_length': 8192
    }
}

# Default model to use
DEFAULT_MODEL = MODELS['llama_tool']['id']