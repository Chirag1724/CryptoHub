import React, { useEffect } from "react";
import "./Company.css";
import AOS from "aos";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="company-container">
            <div className="company-glow-1"></div>
            <div className="company-glow-2"></div>

            <div className="company-inner">
                <header className="company-header" data-aos="fade-down">
                    <h1 className="company-title">About <span className="text-gradient-cyan">CryptoHub</span>.</h1>
                    <p className="company-subtitle">Architecting the Infrastructure for a Decentralized Future</p>
                </header>

                <main className="company-main">
                    <section className="company-section grid-2" data-aos="fade-up">
                        <div className="company-content-block">
                            <h2>The Vision</h2>
                            <p>
                                CryptoHub was born out of a singular necessity: to bridge the gap between complex blockchain data and retail accessibility. We believe that professional-grade analytics should not be gated by high costs or technical complexity.
                            </p>
                            <p>
                                Our terminal provides a unified interface for tracking the entire crypto-assets ecosystem with institutional-grade precision.
                            </p>
                        </div>
                        <div className="company-stats-grid">
                            <div className="stat-card">
                                <h3>500+</h3>
                                <p>Exchanges Tracked</p>
                            </div>
                            <div className="stat-card">
                                <h3>1.2s</h3>
                                <p>Avg. Price Sync</p>
                            </div>
                            <div className="stat-card">
                                <h3>14M+</h3>
                                <p>API Heartbeats/Day</p>
                            </div>
                            <div className="stat-card">
                                <h3>99.9%</h3>
                                <p>System Uptime</p>
                            </div>
                        </div>
                    </section>

                    <section className="company-section" data-aos="fade-up">
                        <div className="company-content-full highlight-box">
                            <h2>Core Principles</h2>
                            <div className="principles-grid">
                                <div className="principle-item">
                                    <div className="principle-icon">⚡</div>
                                    <h4>Low-Latency Execution</h4>
                                    <p>Proprietary data pipelines ensuring you react to market shifts before the competition.</p>
                                </div>
                                <div className="principle-item">
                                    <div className="principle-icon">🛡️</div>
                                    <h4>Analytical Sovereignty</h4>
                                    <p>No tracking, no cookies without consent. Your data analysis remains yours alone.</p>
                                </div>
                                <div className="principle-item">
                                    <div className="principle-icon">💎</div>
                                    <h4>Zero-Noise Interface</h4>
                                    <p>Clean institutional design focused on high-density information without distractions.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="company-section text-center" data-aos="fade-up">
                        <h2>The Infrastructure</h2>
                        <p className="max-600">
                            Powered by global node networks and the CoinGecko V3 Institutional API, we provide the most comprehensive asset coverage in the industry.
                        </p>
                        <div className="tech-stack-flex">
                            <span className="tech-tag">React.js</span>
                            <span className="tech-tag">Node.js</span>
                            <span className="tech-tag">Framer Motion</span>
                            <span className="tech-tag">Chart.js</span>
                            <span className="tech-tag">AOS</span>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AboutUs;
