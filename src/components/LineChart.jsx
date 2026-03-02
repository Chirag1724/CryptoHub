import React, { useEffect, useRef } from "react";

const LineChart = ({ coinId, symbol, currency }) => {
  const container = useRef();

  // Mapping some common coins to TradingView symbols if needed, 
  // though typically ${symbol}USDT works for many
  const tvSymbol = symbol ? `${symbol.toUpperCase()}${currency?.name?.toUpperCase() === 'INR' ? 'INR' : 'USDT'}` : "BTCUSDT";

  useEffect(() => {
    // Clear any existing widgets
    if (container.current) {
      container.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": `BINANCE:${tvSymbol}`,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": false,
      "save_image": false,
      "calendar": false,
      "hide_volume": false,
      "support_host": "https://www.tradingview.com",
      "container_id": "tv-chart-widget",
      "backgroundColor": "rgba(0, 0, 0, 1)",
      "gridColor": "rgba(59, 130, 246, 0.06)",
    });

    container.current.appendChild(script);
  }, [tvSymbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default LineChart;