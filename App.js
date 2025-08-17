import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [metrics, setMetrics] = useState({});
  const [history, setHistory] = useState([]);

  // Fetch metrics from backend
  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/metrics");
      const data = await response.json();
      setMetrics(data);

      // keep history for chart
      setHistory((prev) => [...prev.slice(-9), data]); // store last 10 polls
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics(); // initial fetch
    const interval = setInterval(fetchMetrics, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const chartData = {
    labels: history.map((_, idx) => `Poll ${idx + 1}`),
    datasets: [
      {
        label: "CPU Usage (%)",
        data: history.map((m) => m.cpu_usage_percent),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Latency (ms)",
        data: history.map((m) => m.latency_ms),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="App">
      <h1>📊 Metrics Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>CPU Usage</h3>
          <p>{metrics.cpu_usage_percent}%</p>
        </div>
        <div className="card">
          <h3>Latency</h3>
          <p>{metrics.latency_ms} ms</p>
        </div>
        <div className="card">
          <h3>Memory Usage</h3>
          <p>{metrics.memory_usage_mb} MB</p>
        </div>
        <div className="card">
          <h3>Request Count</h3>
          <p>{metrics.request_counter}</p>
        </div>
      </div>

      <div className="chart">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;
