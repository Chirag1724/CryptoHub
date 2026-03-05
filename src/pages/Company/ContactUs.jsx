import React, { useEffect, useState } from "react";
import "./Company.css";
import AOS from "aos";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1000 });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        alert("Transmission Received. Our analysts will contact you shortly.");
    };

    return (
        <div className="company-container">
            <div className="company-glow-1"></div>
            <div className="company-glow-2"></div>

            <div className="company-inner">
                <header className="company-header" data-aos="fade-down">
                    <h1 className="company-title">Contact <span className="text-gradient-cyan">Support</span></h1>
                    <p className="company-subtitle">Direct Uplink to the CryptoHub Intelligence Team</p>
                </header>

                <div className="company-layout grid-2">
                    <section className="contact-info-section" data-aos="fade-right">
                        <div className="contact-card">
                            <h2>Get in Touch</h2>
                            <p>Have a technical inquiry or feedback? Our team is available 24/7 to assist you with your terminal experience.</p>

                            <div className="contact-methods">
                                <div className="method-item">
                                    <div className="method-icon"><FiMail /></div>
                                    <div className="method-text">
                                        <h4>Email</h4>
                                        <p>support@cryptohub.com</p>
                                    </div>
                                </div>
                                <div className="method-item">
                                    <div className="method-icon"><FiMapPin /></div>
                                    <div className="method-text">
                                        <h4>Headquarters</h4>
                                        <p>Dubai Silicon Oasis, UAE</p>
                                    </div>
                                </div>
                                <div className="method-item">
                                    <div className="method-icon"><FiPhone /></div>
                                    <div className="method-text">
                                        <h4>Enterprise Support</h4>
                                        <p>+971 4 000 0000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="contact-form-section" data-aos="fade-left">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="Inquiry subject"
                                    required
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Transmission details..."
                                    required
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn-neon">
                                <FiSend /> Send Transmission
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
