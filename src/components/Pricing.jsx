import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiArrowRight, FiZap } from "react-icons/fi";
import { plans, faqs, comparisonFeatures } from "../data/pricingPlansData";
import './Pricing.css';

export default function Pricing() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handlePlanClick = useCallback((planName) => {
    if (planName === "Explorer") {
      navigate("/signup");
    } else {
      alert("Enterprise features coming soon! 🚀");
    }
  }, [navigate]);

  const getPrice = (planPrice, cycle) => {
    const numericPrice = parseFloat(planPrice.replace('$', '')) || 0;
    if (cycle === "yearly") {
      return `$${(numericPrice * 10)}`; // 2 months free
    }
    return planPrice;
  };

  return (
    <div className="pricing-container min-h-screen pt-32 pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Smarter <span className="text-blue-500">Trading.</span><br />
            Better Value.
          </motion.h1>
          <p className="text-xl text-gray-400 mb-4">
            Professional-grade data and analytics for every crypto investor.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle-pill mt-24">
            <button
              className={`billing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`billing-toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full ml-1">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className="glass-card-professional p-8 flex flex-col relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {plan.highlight && <div className="popular-badge-sleek">Most Popular</div>}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">{getPrice(plan.price, billingCycle)}</span>
                  <span className="text-gray-500 font-medium">/{billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className={`flex items-center gap-3 text-sm ${feature.available ? 'text-gray-200' : 'text-gray-600'}`}>
                    {feature.available ? <FiCheck className="text-blue-500" /> : <FiX />}
                    {feature.label}
                  </div>
                ))}
              </div>

              <button
                className={plan.highlight ? 'btn-pricing-primary' : 'btn-pricing-secondary'}
                onClick={() => handlePlanClick(plan.name)}
              >
                {plan.name === 'Explorer' ? 'Start for Free' : 'Upgrade Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-32">
          <h2 className="text-4xl font-black mb-12 text-center">Feature Comparison</h2>
          <div className="comparison-table-wrapper">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="p-6 text-sm font-bold uppercase tracking-widest text-gray-500">Feature</th>
                    {plans.map(p => (
                      <th key={p.name} className="p-6 text-center text-lg font-bold">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonFeatures.map((f, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 text-gray-300 font-medium">{f.name}</td>
                      {plans.map(p => {
                        const available = p.features.some(feat =>
                          f.keywords.some(kw => feat.label.toLowerCase().includes(kw.toLowerCase())) && feat.available
                        );
                        return (
                          <td key={p.name} className="p-6 text-center">
                            {available ? <FiCheck className="mx-auto text-blue-500 w-5 h-5" /> : <FiX className="mx-auto text-gray-700 w-5 h-5" />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card-professional overflow-hidden">
                <button
                  className="w-full p-6 text-left flex justify-between items-center bg-transparent border-none cursor-pointer"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  <FiZap className={`transition-transform duration-300 ${openFaqIndex === i ? 'text-blue-500' : 'text-gray-600'}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}