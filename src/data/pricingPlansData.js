export const plans = [
  {
    name: "Explorer",
    price: "$0",
    period: "/month",
    description: "Perfect for beginners",
    highlight: false,
    features: [
      { label: "Real-time Market Data", available: true },
      { label: "5 Alpha Signals/Day", available: true },
      { label: "Public Community Access", available: true },
      { label: "Email Notifications", available: true },
      { label: "Advanced Technical Charts", available: false },
      { label: "Direct API Access", available: false },
      { label: "Whale Wallet Tracking", available: false },
    ]
  },
  {
    name: "Trader",
    price: "$15",
    period: "",
    description: "For active traders",
    highlight: true,
    features: [
      { label: "Real-time Market Data", available: true },
      { label: "Unlimited Alpha Signals", available: true },
      { label: "Pro Discord Community", available: true },
      { label: "SMS + Email Alerts", available: true },
      { label: "Advanced Technical Charts", available: true },
      { label: "Direct API Access", available: false },
      { label: "Whale Wallet Tracking", available: false },
    ]
  },
  {
    name: "Pro",
    price: "$39",
    period: "",
    description: "Institutional features",
    highlight: false,
    features: [
      { label: "Raw Exchange Connectivity", available: true },
      { label: "Institutional Grade Signals", available: true },
      { label: "Private VIP Alpha Group", available: true },
      { label: "Multi-channel Webhooks", available: true },
      { label: "Proprietary Indicators", available: true },
      { label: "L3 Direct API Access", available: true },
      { label: "Whale Wallet Tracking", available: true },
      { label: "AI Sentiment Analysis", available: true },
    ]
  }
];

export const comparisonFeatures = [
  { name: "Market Data", keywords: ["Market Data", "Exchange Connectivity"] },
  { name: "Alpha Signals", keywords: ["Signals"] },
  { name: "Community Access", keywords: ["Community", "Alpha Group"] },
  { name: "Alerts & Notifications", keywords: ["Alerts", "Notifications", "Webhooks"] },
  { name: "Advanced Analytics", keywords: ["Charts", "Indicators", "Sentiment"] },
  { name: "API Access", keywords: ["API"] },
  { name: "Whale Tracking", keywords: ["Whale"] }
];

export const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency payments through our secure gateway."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes! Cancel anytime with no questions asked. Your subscription will continue until the end of the billing period."
  },
  {
    question: "Is there a free trial?",
    answer: "The Explorer plan is completely free forever. All paid plans come with a 14-day money-back guarantee."
  },
  {
    question: "How secure is my data?",
    answer: "We use enterprise-grade encryption (AES-256) and comply with GDPR, SOC 2 Type II standards. Your data is safe."
  }
];