import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Coin.css";
import { CoinContext } from "../../../context/CoinContext";
import LineChart from "../../../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [coindata, setCoinData] = useState(null);
  const [historicaldata, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
        },
      };

      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
        .then((res) => res.json())
        .then((res) => {
          setCoinData(res);
        })
        .catch((err) => console.error(err));
    };

    const fetchHistoricalData = async () => {
      if (!currency?.name) return; // don’t fetch until currency is ready

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": import.meta.env.VITE_CG_API_KEY,
        },
      };

      fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          console.log("Historical data:", res);
          setHistoricalData(res);
        })
        .catch((err) => console.error("History fetch error:", err));
    };

    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (!coindata || !historicaldata) {
    return (
      <div className="coin-loader">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin-page">
      <div className="coin-inner">
        {/* Back Button */}
        <div className="coin-back-btn" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Market
        </div>

        {/* Hero Section */}
        <div className="coin-hero" data-aos="fade-up">
          <div className="coin-title-group">
            <div className="coin-img-wrapper">
              <img className="coin-hero-logo" src={coindata?.image?.large} alt={coindata?.name} />
              <div className="live-status-dot"></div>
            </div>
            <div className="coin-title-text">
              <h1 className="coin-name gradient-text">{coindata?.name}</h1>
              <div className="coin-meta-badges">
                <span className="coin-symbol-badge">{coindata?.symbol?.toUpperCase()}</span>
                <span className="coin-rank-badge">Rank #{coindata.market_cap_rank}</span>
              </div>
            </div>
          </div>
          <div className="coin-price-group" data-aos="fade-left" data-aos-delay="200">
            <div className="current-price-label">Live Price ({currency.name.toUpperCase()})</div>
            <div className="current-price-value">
              {currency.Symbol}
              {coindata.market_data.current_price[currency.name].toLocaleString()}
            </div>
            <div className={`price-change-badge ${coindata.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
              <span className="change-icon">{coindata.market_data.price_change_percentage_24h > 0 ? '▲' : '▼'}</span>
              {Math.abs(coindata.market_data.price_change_percentage_24h).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="coin-info-grid">
          <div className="info-card" data-aos="fade-up" data-aos-delay="300">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 9-10 12L2 12l4-9z"></path></svg>
            </div>
            <div className="info-content">
              <span className="info-label">Market Cap</span>
              <span className="info-value">
                {currency.Symbol}
                {coindata.market_data.market_cap[currency.name].toLocaleString()}
              </span>
            </div>
          </div>
          <div className="info-card" data-aos="fade-up" data-aos-delay="400">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <div className="info-content">
              <span className="info-label">24h Low / High</span>
              <span className="info-value">
                {currency.Symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()} / {currency.Symbol}{coindata.market_data.high_24h[currency.name].toLocaleString()}
              </span>
            </div>
          </div>
          <div className="info-card" data-aos="fade-up" data-aos-delay="500">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path></svg>
            </div>
            <div className="info-content">
              <span className="info-label">Total Volume</span>
              <span className="info-value">
                {currency.Symbol}
                {coindata.market_data.total_volume[currency.name].toLocaleString()}
              </span>
            </div>
          </div>
          <div className="info-card" data-aos="fade-up" data-aos-delay="600">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div className="info-content">
              <span className="info-label">Circulating Supply</span>
              <span className="info-value">
                {coindata.market_data.circulating_supply.toLocaleString()} {coindata.symbol.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section: Chart & Detailed Stats */}
        <div className="coin-content-section">
          <div className="coin-chart-container" data-aos="fade-right" data-aos-delay="700">
            <div className="section-header-compact">
              <div className="section-title-with-icon">
                <span className="title-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                </span>
                <h3>Real-Time Analysis</h3>
              </div>
              <div className="chart-legend">
                <span className="legend-dot"></span> Live Technical Chart
              </div>
            </div>
            <div className="line-chart-wrapper">
              <LineChart
                coinId={coinId}
                symbol={coindata?.symbol}
                currency={currency}
              />
            </div>
          </div>

          <div className="coin-extra-stats" data-aos="fade-left">
            <h3>Key Indicators</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span>ATH</span>
                <span>{currency.Symbol}{coindata.market_data.ath[currency.name].toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>ATL</span>
                <span>{currency.Symbol}{coindata.market_data.atl[currency.name].toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Fully Diluted Val</span>
                <span>{currency.Symbol}{(coindata.market_data.fully_diluted_valuation[currency.name] || 'N/A').toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span>Max Supply</span>
                <span>{coindata.market_data.max_supply ? coindata.market_data.max_supply.toLocaleString() : 'Infinite'}</span>
              </div>
            </div>
          </div>
        </div>

        {/*  PROFESSIONAL ANALYSIS SECTION (TEASER + LOCK)  */}
        <div className="coin-analysis-section" data-aos="fade-up">
          <div className="analysis-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <h2>On-Chain Analysis & Market Sentiment</h2>
          </div>

          <div className="analysis-content-wrapper">
            <div className="analysis-teaser">
              <p>
                Technical indicators for <strong>{coindata.name}</strong> suggest a consolidating phase in the short term.
                The current support level at <strong>{currency.Symbol}{coindata.market_data.low_24h[currency.name].toLocaleString()}</strong>
                has shown significant resilience over the last 48 hours. Volume profiles indicate a subtle accumulation trend among mid-tier holders,
                while social sentiment remains cautiously optimistic...
              </p>
            </div>

            <div className="locked-insights-container">
              <div className="analysis-blur-layer">
                <p>Whale activity has increased by 12% in the last session, suggesting a potential breakout toward the resistance zone. Our proprietary AI models predict a high-volatility event within the next 72 hours based on historical correlation with...</p>
                <div className="fake-data-viz">
                  <div className="fake-bar"></div>
                  <div className="fake-bar" style={{ height: '60%' }}></div>
                  <div className="fake-bar" style={{ height: '90%' }}></div>
                  <div className="fake-bar" style={{ height: '40%' }}></div>
                </div>
              </div>

              <div className="unlock-overlay-compact">
                <div className="lock-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3>View Full AI Intelligence Report</h3>
                <p>Unlock deep-dive metrics, whale alerts, and 7-day price predictions.</p>
                <button className="view-full-btn" onClick={() => navigate('/login')}>
                  View Full Analysis →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;

