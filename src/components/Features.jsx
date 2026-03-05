import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./Features.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AOS from "aos";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const Features = () => {
  const topCoins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", color: "#3b82f6" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
    { id: "solana", name: "Solana", symbol: "SOL", color: "#14F195" },
    { id: "binancecoin", name: "BNB", symbol: "BNB", color: "#F3BA2F" },
    { id: "cardano", name: "Cardano", symbol: "ADA", color: "#2979FF" },
  ];

  const [selectedCoin, setSelectedCoin] = useState(topCoins[0].id);
  const [days, setDays] = useState(1);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentCoin = topCoins.find(c => c.id === selectedCoin) || topCoins[0];

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=inr&days=${days}`
        );
        const data = await res.json();
        setPrices(data.prices || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPrices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCoin, days]);

  const chartData = {
    labels: prices.map((price) =>
      days === 1
        ? new Date(price[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${currentCoin.name} (INR)`,
        data: prices.map((price) => price[1]),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        pointRadius: 0,
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  const timeRanges = [
    { value: 1, label: "Last 24 Hours" },
    { value: 7, label: "Last 7 Days" },
    { value: 30, label: "1 Month" },
    { value: 90, label: "3 Months" },
    { value: 365, label: "1 Year" },
  ];

  return (
    <div className="features-container">
      <div className="glow-spot top-right"></div>
      <div className="glow-spot bottom-left"></div>

      <div className="features-inner">
        <header className="features-header" data-aos="fade-down">
          <h1>Market <span className="text-gradient-cyan">Intelligence</span></h1>
          <p>Institutional-grade charting and high-precision real-time data analysis for elite digital asset management.</p>
        </header>

        <section className="top-coins-section" data-aos="fade-up" style={{ paddingBottom: '2rem' }}>
          <h3>Elite Index Performance</h3>
          <div className="coins-grid">
            {topCoins.map((coin) => (
              <div
                key={coin.id}
                className={`coin-item ${selectedCoin === coin.id ? 'active' : ''}`}
                onClick={() => setSelectedCoin(coin.id)}
              >
                <span className="coin-symbol">{coin.symbol}</span>
                <span className="coin-name">{coin.name}</span>
              </div>
            ))}
          </div>
        </section>

        <main className="features-card-main" data-aos="fade-up">
          <div className="features-controls">
            <div className="cosmic-select-container">
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="cosmic-select"
              >
                {topCoins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="cosmic-select-container">
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="cosmic-select"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="chart-wrapper">
            {loading ? (
              <div className="features-loading">
                <div className="loader"></div>
                <p className="loading-text">Synchronizing Data Profiles...</p>
              </div>
            ) : prices.length === 0 ? (
              <div className="no-data">
                <h3>No Data Synced</h3>
                <p>Ensure API endpoint availability or refresh your session.</p>
              </div>
            ) : (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      titleColor: '#f8fafc',
                      bodyColor: '#3b82f6',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: 1,
                      padding: 12,
                      cornerRadius: 8,
                      titleFont: { family: 'Inter', size: 14, weight: 'bold' },
                      bodyFont: { family: 'Inter', size: 13 },
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: 'rgba(255, 255, 255, 0.3)',
                        font: { family: 'Inter', size: 11 },
                        maxTicksLimit: 6,
                      },
                      grid: { color: 'rgba(255, 255, 255, 0.03)', drawBorder: false },
                    },
                    y: {
                      position: 'right',
                      ticks: {
                        color: 'rgba(255, 255, 255, 0.3)',
                        font: { family: 'Inter', size: 11 },
                        callback: function (value) {
                          return '₹' + value.toLocaleString();
                        }
                      },
                      grid: { color: 'rgba(255, 255, 255, 0.03)', drawBorder: false },
                    }
                  }
                }}
              />
            )}
          </div>
        </main>

        <section className="professional-features-grid" data-aos="fade-up">
          <div className="section-title-professional">
            <h3>Platform Protocol Capabilities</h3>
            <p>Deploying advanced analytical frameworks for high-stakes digital asset management.</p>
          </div>

          <div className="features-grid-inner">
            <div className="p-feature-card">
              <div className="p-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h4>Real-Time Intelligence</h4>
              <p>Low-latency data synchronization across 500+ global liquid exchanges with sub-second precision.</p>
            </div>

            <div className="p-feature-card">
              <div className="p-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h4>Institutional Security</h4>
              <p>Military-grade AES-256 encryption protocols protecting your sensitive analytical environment and data.</p>
            </div>

            <div className="p-feature-card">
              <div className="p-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h4>Global Multi-Tier Data</h4>
              <p>Seamless cross-currency conversion supporting INR, USD, and EUR with automated arbitrage mapping.</p>
            </div>

            <div className="p-feature-card">
              <div className="p-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h4>AI-Driven Insights</h4>
              <p>Proprietary machine learning models analyzing sentiment and on-chain liquidity flows in real-time.</p>
            </div>
          </div>
        </section>


        <footer className="features-note">
          Protocol: CoinGecko API v3 • High-Latency Data Relay Restricted
        </footer>
      </div>
    </div>
  );
};

export default Features;
