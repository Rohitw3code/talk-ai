# TalkKAI - Intelligent RAG-Powered Document Chat Platform

![TalkKAI Banner](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=400)

## 🚀 Overview

TalkKAI is a cutting-edge **Retrieval-Augmented Generation (RAG)** platform that transforms how you interact with your documents. Upload PDF files and engage in intelligent conversations with AI that understands your content contextually and provides accurate, source-based responses.

### 🎯 What is RAG?

**Retrieval-Augmented Generation (RAG)** is an advanced AI technique that combines:
- **Document Retrieval**: Finding relevant information from your uploaded documents
- **AI Generation**: Using that context to generate accurate, informed responses
- **Vector Search**: Converting text into mathematical representations for semantic understanding

This approach ensures AI responses are grounded in your actual document content, reducing hallucinations and improving accuracy.

## ✨ Key Features

### 🧠 Advanced AI Capabilities
- **Multi-Model Support**: Choose from Claude 3.5 Sonnet, GPT-4 Turbo, Gemini Pro, Grok-2, and more
- **Intelligent Document Processing**: Automatic text extraction and chunking for optimal AI understanding
- **Context-Aware Responses**: AI that remembers conversation history and document context
- **Real-time Processing**: Lightning-fast document analysis and response generation

### 📄 Document Intelligence
- **PDF Support**: Upload and analyze PDF documents up to 16MB
- **Smart Chunking**: Documents are intelligently split into searchable segments
- **Vector Embeddings**: Advanced semantic search using OpenAI embeddings
- **Content Preservation**: Maintains document structure and context

### 💬 Interactive Chat Experience
- **Natural Conversations**: Engage in fluid, context-aware discussions about your documents
- **Question Suggestions**: Smart prompts to help you explore your content
- **Chat History**: Persistent conversation history for each document
- **Multi-Document Support**: Switch between different documents seamlessly

### 🎨 Modern Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Eye-friendly dark theme with smooth transitions
- **Intuitive Navigation**: Clean, professional interface with sidebar document management
- **Real-time Feedback**: Visual indicators for upload progress and processing status

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for responsive, utility-first styling
- **Lucide React** for consistent iconography
- **Vite** for fast development and optimized builds

### Backend
- **Flask** Python web framework
- **LangChain** for RAG implementation and document processing
- **OpenAI Embeddings** for semantic vector representations
- **Groq LLM** for fast, efficient text generation
- **FAISS** for vector similarity search
- **PyPDF** for PDF text extraction

### AI & ML
- **RAG Architecture**: Retrieval-Augmented Generation for accurate responses
- **Vector Database**: FAISS for efficient similarity search
- **Text Chunking**: Recursive character splitting for optimal context windows
- **Embedding Models**: OpenAI's text-embedding-ada-002

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- OpenAI API key
- Groq API key

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd talkkai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to API directory**
   ```bash
   cd api
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set environment variables**
   ```bash
   export OPENAI_API_KEY='your-openai-api-key'
   export GROQ_API_KEY='your-groq-api-key'
   ```

4. **Run the Flask server**
   ```bash
   python run.py
   ```

### API Keys Setup

#### OpenAI API Key (Required for embeddings)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Set as environment variable: `OPENAI_API_KEY`

#### Groq API Key (Required for chat)
1. Visit [Groq Console](https://console.groq.com/keys)
2. Create a new API key
3. Set as environment variable: `GROQ_API_KEY`

## 📖 Usage Guide

### 1. Document Upload
- Click "Upload Document" or drag & drop PDF files
- Maximum file size: 16MB
- Supported format: PDF only
- Processing time: 10-30 seconds depending on document size

### 2. Document Processing
The system automatically:
- Extracts text from your PDF
- Splits content into optimal chunks (1000 characters with 200 overlap)
- Creates vector embeddings for semantic search
- Stores in FAISS vector database

### 3. Intelligent Chat
- Ask questions about your document content
- Request summaries, analysis, or specific information
- Use suggested prompts for common tasks
- Switch between documents in the sidebar

### 4. Advanced Features
- **Document Management**: View, select, and delete uploaded documents
- **Chat History**: Access previous conversations for each document
- **Multi-Document**: Upload and chat with multiple documents
- **Export Options**: Copy responses for external use

## 🎯 Use Cases

### 📚 Academic & Research
- **Research Paper Analysis**: Extract methodologies, findings, and citations
- **Literature Reviews**: Summarize multiple papers and identify patterns
- **Thesis Support**: Get insights and analysis for academic writing
- **Study Guides**: Create comprehensive summaries from textbooks

### 💼 Business & Professional
- **Contract Analysis**: Review terms, conditions, and key clauses
- **Report Summarization**: Extract key insights from business reports
- **Policy Review**: Understand complex policy documents
- **Meeting Minutes**: Analyze and extract action items

### 🎓 Education & Training
- **Exam Preparation**: Generate practice questions and study materials
- **Course Content**: Break down complex educational materials
- **Training Manuals**: Extract procedures and guidelines
- **Certification Study**: Prepare for professional certifications

### ⚖️ Legal & Compliance
- **Document Review**: Analyze legal documents and contracts
- **Compliance Checking**: Ensure adherence to regulations
- **Case Study Analysis**: Extract relevant legal precedents
- **Risk Assessment**: Identify potential legal issues

## 🏗️ Architecture

### RAG Pipeline
```
PDF Upload → Text Extraction → Chunking → Embeddings → Vector Store
                                                            ↓
User Query → Query Embedding → Similarity Search → Context Retrieval → LLM → Response
```

### System Components
- **Document Processor**: Handles PDF upload and text extraction
- **Chunking Engine**: Splits documents into optimal segments
- **Embedding Service**: Creates vector representations using OpenAI
- **Vector Database**: FAISS for efficient similarity search
- **Chat Engine**: LangChain QA chain with Groq LLM
- **API Layer**: Flask REST API for frontend communication

## 🔧 Configuration

### Environment Variables
```bash
# Required
OPENAI_API_KEY=your-openai-api-key
GROQ_API_KEY=your-groq-api-key

# Optional
FLASK_ENV=development
FLASK_DEBUG=True
MAX_FILE_SIZE=16777216  # 16MB in bytes
```

### Customization Options
- **Chunk Size**: Modify `chunk_size` in text splitter (default: 1000)
- **Chunk Overlap**: Adjust `chunk_overlap` for context preservation (default: 200)
- **Model Selection**: Switch between different LLM models in the backend
- **Embedding Model**: Change OpenAI embedding model if needed

## 🚀 Deployment

### Frontend Deployment (Netlify)
The frontend is automatically deployed to Netlify:
- **Live URL**: [https://zingy-buttercream-1c2e18.netlify.app](https://zingy-buttercream-1c2e18.netlify.app)
- **Auto-deploy**: Connected to main branch for continuous deployment

### Backend Deployment Options
- **Azure Web Apps**: Current production deployment
- **Heroku**: Easy deployment with buildpacks
- **AWS EC2**: Full control over server configuration
- **Docker**: Containerized deployment for any platform

### Production Considerations
- Set up proper environment variable management
- Configure CORS for your frontend domain
- Implement rate limiting and authentication
- Set up monitoring and logging
- Use a production WSGI server (gunicorn)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices for frontend
- Use Python type hints for backend code
- Write comprehensive tests for new features
- Update documentation for API changes
- Follow the existing code style and conventions

## 📝 API Documentation

### Endpoints

#### Health Check
```http
GET /health
```
Returns API status and configuration info.

#### Upload Document
```http
POST /upload
Content-Type: multipart/form-data

{
  "file": <PDF file>
}
```

#### Chat with Document
```http
POST /chat/{document_id}
Content-Type: application/json

{
  "message": "Your question here"
}
```

#### Get Chat History
```http
GET /chat/{document_id}/history
```

#### List Documents
```http
GET /documents
```

#### Delete Document
```http
DELETE /documents/{document_id}
```

## 🔒 Security & Privacy

- **Data Privacy**: Documents are processed in-memory and not permanently stored
- **API Security**: Secure API key management and validation
- **File Validation**: Strict file type and size validation
- **Error Handling**: Comprehensive error handling without data exposure
- **CORS Protection**: Configured for secure cross-origin requests

## 📊 Performance

### Optimization Features
- **Efficient Chunking**: Optimized text splitting for better context
- **Vector Caching**: FAISS for fast similarity search
- **Streaming Responses**: Real-time response generation
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized assets for faster loading

### Benchmarks
- **Upload Processing**: ~2-5 seconds for typical documents
- **Query Response**: ~1-3 seconds for most questions
- **Vector Search**: Sub-second similarity matching
- **Memory Usage**: Efficient in-memory document storage

## 🐛 Troubleshooting

### Common Issues

#### Upload Fails
- Check file size (max 16MB)
- Ensure file is a valid PDF
- Verify API keys are set correctly

#### Slow Responses
- Check internet connection
- Verify API rate limits
- Consider document complexity

#### Chat Not Working
- Ensure document is fully processed
- Check browser console for errors
- Verify backend is running

### Debug Mode
Enable debug mode for detailed logging:
```bash
export FLASK_DEBUG=True
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for powerful embedding models
- **Groq** for fast LLM inference
- **LangChain** for RAG framework
- **Tailwind CSS** for beautiful styling
- **React** team for the amazing framework

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using modern AI and web technologies**

*Transform your documents into intelligent conversations with TalkKAI*