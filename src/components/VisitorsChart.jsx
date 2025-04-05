import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { chartData } from "../constants/chartData";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(" ", "-");
};

const formatValue = (value) => value >= 1000 ? (value / 1000).toFixed(1) + "K" : value.toLocaleString();

const getFilteredData = (data, range) => {
  const today = new Date();
  let startDate = new Date();

  switch (range) {
    case "Today":
      return data.filter((d) => new Date(d.date).toDateString() === today.toDateString());
    case "Yesterday":
      startDate.setDate(today.getDate() - 1);
      return data.filter((d) => new Date(d.date).toDateString() === startDate.toDateString());
    case "This week":
      startDate.setDate(today.getDate() - today.getDay() + 1);
      break;
    case "Last week":
      startDate.setDate(today.getDate() - today.getDay() - 6);
      break;
    case "Last 7 days":
      startDate.setDate(today.getDate() - 7);
      break;
    case "Last 30 days":
      startDate.setDate(today.getDate() - 30);
      break;
    default:
      break;
  }

  return data.filter((d) => new Date(d.date) >= startDate && new Date(d.date) <= today);
};

const colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63"];

const VisitorsChart = ({ selectedMetrics, selectedDate }) => {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const newDatasets = selectedMetrics.map((metric, index) => {
      const raw = chartData[metric] || [];
      const filtered = getFilteredData(raw, selectedDate);

      return {
        label: metric,
        data: filtered.map((d) => d.value),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + "33",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
      };
    });

    setDatasets(newDatasets);
  }, [selectedMetrics, selectedDate]);

  const chartLabels =
    selectedMetrics.length > 0
      ? getFilteredData(chartData[selectedMetrics[0]], selectedDate).map((d) =>
          formatDate(d.date)
        )
      : [];

  const totalValue = datasets.reduce(
    (sum, ds) => sum + ds.data.reduce((a, b) => a + b, 0),
    0
  );

  const data = {
    labels: chartLabels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#fff" } },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: true,
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#fff",
          callback: (value) =>
            value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <>
      <div className="text-white mt-2 px-4">
        <p className="text-lg font-semibold">
          Total: <span className="text-2xl">{formatValue(totalValue)}</span>
        </p>
      </div>
      <div className="bg-black p-4 rounded h-64">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default VisitorsChart;
