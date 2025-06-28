import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Typography from './ui/Typography';
import Card from './ui/Card';
import Section from './ui/Section';

const faqs = [
  {
    question: 'How does the AI understand my conversations?',
    answer: 'Our AI uses advanced natural language processing and machine learning algorithms to analyze and understand the context, intent, and nuances of your conversations, enabling intelligent and contextual responses.'
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest, and we follow industry-standard security practices. Your conversations are never shared with third parties.'
  },
  {
    question: 'What AI models are available?',
    answer: 'We support multiple state-of-the-art AI models including Claude, GPT-4, Gemini Pro, and more. You can switch between models based on your specific needs and preferences.'
  },
  {
    question: 'Can I use this for commercial purposes?',
    answer: 'Yes, our Pro and Enterprise plans are designed for commercial use. The Free plan is perfect for personal projects and evaluation purposes.'
  },
  {
    question: 'How accurate are the AI responses?',
    answer: 'Our AI models are highly accurate and continuously improving. However, we recommend reviewing AI-generated content, especially for critical applications. The accuracy depends on the quality and clarity of your input.'
  },
  {
    question: 'Can I integrate this with my existing tools?',
    answer: 'Yes, we offer API access and various integrations. Our Enterprise plan includes custom integration support to connect with your existing workflow and tools.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" background="gradient">
      <div className="text-center mb-12 sm:mb-16">
        <Typography variant="h2" size="3xl" weight="bold" color="primary" className="sm:text-4xl mb-4 neon-glow">
          Frequently Asked Questions
        </Typography>
        <Typography variant="p" size="lg" color="muted" className="sm:text-xl">
          Get answers to common questions about TalkKAI
        </Typography>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            variant="glass"
            padding="none"
            className="overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
            >
              <Typography variant="span" weight="medium" color="primary">
                {faq.question}
              </Typography>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4">
                <Typography variant="p" color="muted" className="leading-relaxed">
                  {faq.answer}
                </Typography>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}