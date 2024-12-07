import React, { useEffect, useRef, memo } from 'react';
import './TradingViewWidget.css'; // Import the new CSS file

function TradingViewWidget() {
  const container = useRef();
  

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1D|INR"
            ],
            [
              "Google",
              "GOOGL|1D|INR"
            ],
            [
              "Microsoft",
              "MSFT|1D|INR"
            ],
            [
              "NASDAQ:TSLA|ALL|INR"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "light",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "backgroundColor": "rgba(255, 255, 255, 1)",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "dateFormat": "qq 'yy",
          "timeHoursFormat": "24-hours",
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="widget-heading">Stock Market Chart</div>  {/* This is inside the container */}
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <span>Track all markets on TradingView</span>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
