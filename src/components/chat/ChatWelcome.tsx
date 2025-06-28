import React from 'react';
import { Sparkles, FileText, MessageCircle, Search, Upload, Bot, CheckCircle, Zap } from 'lucide-react';
import Typography from '../ui/Typography';
import Card from '../ui/Card';
import { Document } from '../../api/client';

interface ChatWelcomeProps {
  onSuggestionClick: (suggestion: string) => void;
  onFileUpload: () => void;
  hasDocument: boolean;
  currentDocument: Document | null;
}

const suggestions = [
  {
    icon: FileText,
    title: 'Summarize Document',
    description: 'Get a comprehensive summary of the document',
    prompt: 'Please provide a detailed summary of this document, including the main topics and key points.'
  },
  {
    icon: Search,
    title: 'Extract Key Information',
    description: 'Find and extract important data points',
    prompt: 'What are the most important facts, figures, and key information in this document?'
  },
  {
    icon: MessageCircle,
    title: 'Ask Questions',
    description: 'Ask specific questions about the content',
    prompt: 'What are the main conclusions or recommendations in this document?'
  },
  {
    icon: Bot,
    title: 'Analyze Content',
    description: 'Get detailed analysis and insights',
    prompt: 'Analyze the structure and content of this document. What type of document is this and what is its purpose?'
  }
];

export default function ChatWelcome({ 
  onSuggestionClick, 
  onFileUpload, 
  hasDocument, 
  currentDocument 
}: ChatWelcomeProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Welcome header */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="p-4 bg-primary/10 rounded-full">
                {hasDocument ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <Sparkles className="w-8 h-8 text-primary" />
                )}
              </div>
              {hasDocument && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
          
          <Typography variant="h1" size="3xl" weight="bold" color="primary" className="mb-4 sm:text-4xl">
            {hasDocument ? (
              <span className="flex items-center justify-center gap-2 flex-wrap">
                <CheckCircle className="w-8 h-8 text-green-500" />
                Ready to Chat!
              </span>
            ) : (
              'Welcome to TalkKAI'
            )}
          </Typography>
          
          <Typography variant="p" size="lg" color="muted" className="max-w-lg mx-auto mb-6">
            {hasDocument 
              ? `Your document "${currentDocument?.filename}" has been successfully processed into ${currentDocument?.chunk_count} searchable chunks. Start asking questions below!`
              : 'Your intelligent RAG-powered AI assistant. Upload documents to start analyzing with advanced AI.'
            }
          </Typography>

          {/* Current document info with success animation */}
          {hasDocument && currentDocument && (
            <div className="mb-6 animate-slide-up">
              <Card variant="glass" className="p-4 border-2 border-green-500/30 bg-green-50/50 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div className="text-left flex-1">
                    <Typography variant="h4" size="sm" weight="semibold" className="text-green-700 dark:text-green-400">
                      {currentDocument.filename}
                    </Typography>
                    <Typography variant="p" size="xs" className="text-green-600 dark:text-green-500">
                      ✅ {currentDocument.chunk_count} text chunks • Ready for intelligent chat
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-green-500" />
                      <Typography variant="span" size="xs" className="text-green-600 dark:text-green-400 font-medium">
                        AI Ready
                      </Typography>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Upload area - only show if no document */}
          {!hasDocument && (
            <div className="mb-8">
              <Card
                variant="glass"
                hover={true}
                className="cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                onClick={onFileUpload}
              >
                <div className="flex flex-col items-center py-8">
                  <div className="relative mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  </div>
                  <Typography variant="h3" size="base" weight="semibold" color="primary" className="mb-2">
                    Upload Your PDF Document
                  </Typography>
                  <Typography variant="p" size="sm" color="muted" className="mb-3">
                    Drag & drop or click to upload PDF documents for AI analysis
                  </Typography>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary/50 rounded">PDF Only</span>
                    <span className="px-2 py-1 bg-secondary/50 rounded">Max 16MB</span>
                    <span className="px-2 py-1 bg-secondary/50 rounded">RAG Powered</span>
                    <span className="px-2 py-1 bg-secondary/50 rounded">AI Ready</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Suggestion cards - show different suggestions based on whether document is loaded */}
        {hasDocument ? (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                variant="glass"
                hover={true}
                className="cursor-pointer text-left hover:border-primary/30 transition-all duration-300 hover:scale-105"
                onClick={() => onSuggestionClick(suggestion.prompt)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <suggestion.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="h3" size="base" weight="semibold" color="primary" className="mb-1">
                      {suggestion.title}
                    </Typography>
                    <Typography variant="p" size="sm" color="muted">
                      {suggestion.description}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Card
              variant="glass"
              hover={true}
              className="cursor-pointer text-left hover:scale-105 transition-all duration-300"
              onClick={onFileUpload}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Typography variant="h3" size="base" weight="semibold" color="primary" className="mb-1">
                    Upload Document
                  </Typography>
                  <Typography variant="p" size="sm" color="muted">
                    Start by uploading a PDF document
                  </Typography>
                </div>
              </div>
            </Card>

            <Card variant="glass" className="text-left opacity-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted/10 rounded-lg flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <Typography variant="h3" size="base" weight="semibold" color="muted" className="mb-1">
                    Chat with AI
                  </Typography>
                  <Typography variant="p" size="sm" color="muted">
                    Available after document upload
                  </Typography>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Features */}
        <div className="text-center">
          <Typography variant="p" size="sm" color="muted" className="mb-4">
            {hasDocument ? (
              <span className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                Document processed and ready for intelligent conversations
              </span>
            ) : (
              'Powered by advanced RAG technology with OpenAI embeddings and Groq LLM'
            )}
          </Typography>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className={`flex items-center gap-1 ${hasDocument ? 'text-green-500' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${hasDocument ? 'bg-green-500' : 'bg-green-500'}`} />
              Document Analysis
            </span>
            <span className={`flex items-center gap-1 ${hasDocument ? 'text-green-500' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${hasDocument ? 'bg-green-500' : 'bg-blue-500'}`} />
              Vector Search
            </span>
            <span className={`flex items-center gap-1 ${hasDocument ? 'text-green-500' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${hasDocument ? 'bg-green-500' : 'bg-purple-500'}`} />
              Context Aware
            </span>
            <span className={`flex items-center gap-1 ${hasDocument ? 'text-green-500' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${hasDocument ? 'bg-green-500' : 'bg-orange-500'}`} />
              Real-time Chat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}