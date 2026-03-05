import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import AOS from "aos";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="notfound-container">
            <div className="glow-spot top-right"></div>
            <div className="glow-spot bottom-left"></div>

            <div className="notfound-inner" data-aos="zoom-in">
                <div className="notfound-icon">
                    <FiAlertTriangle />
                </div>
                <h1 className="notfound-404">404</h1>
                <h2 className="notfound-title">Signal <span className="text-gradient-cyan">Lost</span></h2>
                <p className="notfound-text">
                    Target data profile not found in our global index. The asset may have been delisted or moved to an encrypted sector.
                </p>

                <div className="notfound-actions">
                    <Link to="/" className="btn-back-home">
                        <FiArrowLeft /> Back to Terminal
                    </Link>
                </div>
            </div>

            <div className="glitch-overlay"></div>
        </div>
    );
};

export default NotFound;
