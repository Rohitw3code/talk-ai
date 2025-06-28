import React from 'react';
import { Check, Star } from 'lucide-react';
import Button from './ui/Button';
import Typography from './ui/Typography';
import Card from './ui/Card';
import Section from './ui/Section';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '100 messages per month',
      'Basic AI models',
      'Standard support',
      'Web access'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For power users and professionals',
    features: [
      'Unlimited messages',
      'All AI models',
      'Priority support',
      'API access',
      'Team collaboration',
      'Advanced analytics'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Custom AI training',
      'Dedicated support',
      'On-premise deployment',
      'Custom integrations',
      'SLA guarantee'
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <Section id="pricing" background="gradient">
      <div className="text-center mb-12 sm:mb-16">
        <Typography variant="h2" size="3xl" weight="bold" color="primary" className="sm:text-4xl mb-4 neon-glow">
          Simple Pricing
        </Typography>
        <Typography variant="p" size="lg" color="muted" className="sm:text-xl">
          Choose the plan that fits your needs
        </Typography>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            variant="glass"
            hover={true}
            className={`relative transition-all duration-300 ${
              plan.popular 
                ? 'border-primary shadow-lg scale-105' 
                : 'border-border hover:border-primary/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <Typography variant="h3" size="xl" weight="bold" color="primary" className="mb-2">
                {plan.name}
              </Typography>
              <div className="mb-2">
                <Typography variant="span" size="3xl" weight="bold" color="primary">
                  {plan.price}
                </Typography>
                <Typography variant="span" color="muted" className="ml-1">
                  /{plan.period}
                </Typography>
              </div>
              <Typography variant="p" color="muted" size="sm">
                {plan.description}
              </Typography>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <Typography variant="span" color="primary" size="sm">
                    {feature}
                  </Typography>
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
              variant={plan.popular ? 'primary' : 'outline'}
            >
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}