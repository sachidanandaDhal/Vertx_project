import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { chartData } from "../constants/chartData";

const VisitorsChart = ({ selectedType, selectedDate }) => {
  const [filteredData, setFilteredData] = useState([]);

  // Format date as "Apr-3"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(" ", "-");
  };
  const formatPrice = (value) => {
    return value >= 1000 ? (value / 1000).toFixed(1) + "K" : value.toLocaleString();
  };

  useEffect(() => {
    if (!selectedType || !chartData[selectedType]) return;

    const allData = chartData[selectedType];

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Start of current week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    // Start & end of last week
    const startOfLastWeek = new Date(today);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);

    // Last 7 days range
    const startOfLast7Days = new Date(today);
    startOfLast7Days.setDate(today.getDate() - 7);

    // Last 30 days range
    const startOfLast30Days = new Date(today);
    startOfLast30Days.setDate(today.getDate() - 30);

    let filtered = [];

    switch (selectedDate) {
      case "Today":
        filtered = allData.filter((d) => new Date(d.date).toDateString() === today.toDateString());
        break;
      case "Yesterday":
        filtered = allData.filter((d) => new Date(d.date).toDateString() === yesterday.toDateString());
        break;
      case "This week":
        filtered = allData.filter((d) => new Date(d.date) >= startOfWeek && new Date(d.date) <= today);
        break;
      case "Last week":
        filtered = allData.filter((d) => new Date(d.date) >= startOfLastWeek && new Date(d.date) <= endOfLastWeek);
        break;
      case "Last 7 days":
        filtered = allData.filter((d) => new Date(d.date) >= startOfLast7Days && new Date(d.date) <= today);
        break;
      case "Last 30 days":
        filtered = allData.filter((d) => new Date(d.date) >= startOfLast30Days && new Date(d.date) <= today);
        break;
      default:
        filtered = allData;
    }

    setFilteredData(filtered);
  }, [selectedType, selectedDate]);

  // Prepare chart data with formatted dates
  const chartLabels = filteredData.map((d) => formatDate(d.date));
  const chartValues = filteredData.map((d) => d.value);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: selectedType,
        data: chartValues,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curves
        pointBackgroundColor: "#fff",
        pointBorderColor: "#4CAF50",
        pointRadius: 4, // Add data points
        pointHoverRadius: 6, // Enlarge on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light grid lines
        },
        ticks: {
          color: "#fff",
          callback: (value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value), // Format numbers
        },
      },
    },
  };

  return (
    <>
    <div className="text-white mt-2">
        <p><span className="font-bold text-2xl pl-4">{formatPrice(chartValues.reduce((a, b) => a + b, 0))}</span></p>
      </div>
    <div className="bg-black  p-4 rounded h-64">
      <Line data={data} options={options} />
    </div>
    </>
  );
};

export default VisitorsChart;
