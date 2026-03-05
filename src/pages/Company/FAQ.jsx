import React, { useEffect, useState } from "react";
import "./Company.css";
import AOS from "aos";

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    const categories = [
        { id: 'general', label: '1. General Platform' },
        { id: 'data', label: '2. Data & Analytics' },
        { id: 'security', label: '3. Security & Account' },
        { id: 'billing', label: '4. Billing & API' }
    ];

    const faqs = {
        general: [
            { q: "What is CryptoHub?", a: "CryptoHub is a high-performance analytical terminal designed for real-time tracking of digital assets across the blockchain ecosystem." },
            { q: "Is the platform free to use?", a: "Yes, we offer a robust free tier. For institutional-grade features like AI insights and low-latency API access, we offer premium subscriptions." }
        ],
        data: [
            { q: "Where does the data come from?", a: "Our data is aggregated from 500+ global exchanges using the CoinGecko V3 Institutional API and our proprietary node network." },
            { q: "How often are prices updated?", a: "Price heartbeats are synchronized every 1.2 to 3 seconds depending on the asset's liquidity and trading volume." }
        ],
        security: [
            { q: "Is my data encrypted?", a: "Absolutely. We utilize AES-256 military-grade encryption for all user environmental data and preference profiles." },
            { q: "Do you share my tracking data?", a: "No. CryptoHub adheres to a strict Zero-Telemetry policy. Your analytical behavior is never sold or shared with third parties." }
        ],
        billing: [
            { q: "Can I cancel my subscription?", a: "Yes, you can manage your subscription at any time via the billing portal in your dashboard settings." },
            { q: "Do you offer API access?", a: "Yes, institutional API keys are available for high-frequency trading and custom analytical integration." }
        ]
    };

    return (
        <div className="company-container">
            <div className="company-glow-1"></div>
            <div className="company-glow-2"></div>

            <div className="company-inner">
                <header className="company-header" data-aos="fade-down">
                    <h1 className="company-title">Frequently Asked <span className="text-gradient-cyan">Questions</span></h1>
                    <p className="company-subtitle">Your Technical Guide to the CryptoHub Ecosystem</p>
                </header>

                <div className="company-layout">
                    <aside className="company-sidebar">
                        <h4>Knowledge Base</h4>
                        <nav className="sidebar-nav">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`sidebar-link ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <main className="company-main-content" data-aos="fade-up">
                        <div className="faq-grid">
                            {faqs[activeCategory].map((faq, index) => (
                                <div className="faq-card" key={index}>
                                    <div className="faq-icon">Q</div>
                                    <div className="faq-content">
                                        <h3>{faq.q}</h3>
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="still-questions">
                            <p>Can't find what you're looking for?</p>
                            <a href="/contact" className="contact-link-btn">Connect with Support</a>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
