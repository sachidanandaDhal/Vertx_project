import React, { useState, useEffect, useRef, useMemo } from "react";
import VisitorsChart from "./VisitorsChart";
import { chartData } from "../constants/chartData";
import Demographics from "./Demographics"; // ✅ Make sure this file exists

const dataTypes = ["Visitors", "Connections", "Interactions", "Impressions"];
const dateRanges = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "Last 7 days",
  "Last 30 days",
];

const formatValue = (value) =>
  value >= 1000 ? (value / 1000).toFixed(1) + "K" : value;

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedType, setSelectedType] = useState("Visitors");
  const [selectedDate, setSelectedDate] = useState("Last 30 days");
  const [addedMetrics, setAddedMetrics] = useState(["Visitors"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedInsightType, setSelectedInsightType] = useState("Visitors");
  const dropdownRef = useRef(null);

  const handleAddMetric = (metric) => {
    if (!addedMetrics.includes(metric)) {
      setAddedMetrics([...addedMetrics, metric]);
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const calculateSummary = useMemo(() => {
    const data = chartData[selectedInsightType] || [];
    const today = new Date();

    let startDate = new Date();
    switch (selectedDate) {
      case "Last 7 days":
        startDate.setDate(today.getDate() - 7);
        break;
      case "Last 30 days":
        startDate.setDate(today.getDate() - 30);
        break;
      case "Yesterday":
        startDate.setDate(today.getDate() - 1);
        break;
      case "Today":
        startDate = today;
        break;
      case "This week":
        startDate.setDate(today.getDate() - today.getDay() + 1);
        break;
      case "Last week":
        startDate.setDate(today.getDate() - today.getDay() - 6);
        break;
      default:
        break;
    }

    const filtered = data.filter(
      (d) => new Date(d.date) >= startDate && new Date(d.date) <= today
    );
    const total = filtered.reduce((sum, d) => sum + d.value, 0);
    const founders = Math.round(total * 0.65);
    const investors = total - founders;

    return {
      founders: formatValue(founders),
      investors: formatValue(investors),
    };
  }, [selectedInsightType, selectedDate]);

  return (
    <div className="bg-black text-white h-screen flex flex-col ">
      {/* Top Navigation Tabs */}
      <div className="flex justify-between items-center text-xs border-b border-gray-900 bg-black sticky top-0 z-10 p-3">
        <div className="flex space-x-6">
          {["Overview", "Demographics"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-white"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="text-gray-400 pr-5 hover:text-white">More</button>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "Overview" ? (
          <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chart Section */}
            <div className="bg-black p-4 rounded-2xl md:col-span-2 border border-gray-800">
              <div className="flex flex-wrap gap-4 items-center mb-3">
                {/* Metric Select */}
                <select
                  className="bg-black text-white text-xs px-3 py-2 rounded-2xl border border-gray-800 w-full sm:w-auto"
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setAddedMetrics([e.target.value]);
                  }}
                >
                  {dataTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Date Range Select */}
                <select
                  className="bg-black text-white text-xs px-3 py-2 rounded-2xl border border-gray-800 w-full sm:w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {dateRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>

                {/* Add Metric Dropdown */}
                <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                  <button
                    className="bg-black px-3 py-2 text-xs text-white rounded-2xl border border-gray-800 w-full sm:w-auto"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    + Add
                  </button>
                  {dropdownOpen && (
                    <div className="absolute mt-2 bg-gray-900 shadow-lg rounded-2xl border border-gray-800 w-40 z-20">
                      {dataTypes
                        .filter((metric) => !addedMetrics.includes(metric))
                        .map((metric) => (
                          <button
                            key={metric}
                            className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                            onClick={() => handleAddMetric(metric)}
                          >
                            {metric}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Chart Component */}
              <VisitorsChart
                selectedMetrics={addedMetrics}
                selectedDate={selectedDate}
              />
            </div>

            {/* Insights Section */}
            <div className="bg-black p-4 rounded-2xl border border-gray-800 text-center">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl md:text-2xl font-semibold">Insights</h1>
                <select
                  className="bg-black text-white text-sm border border-gray-700 rounded-full px-3 py-2 my-3"
                  value={selectedInsightType}
                  onChange={(e) => setSelectedInsightType(e.target.value)}
                >
                  {dataTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <p className="text-xl md:text-2xl font-semibold">Founders</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">
                    {calculateSummary.founders}
                  </span>
                  <span className="text-green-400 text-sm">+000%</span>
                  <span className="text-gray-600 text-xs">(000)</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xl md:text-2xl font-semibold">Investors</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">
                    {calculateSummary.investors}
                  </span>
                  <span className="text-green-400 text-sm">+000%</span>
                  <span className="text-gray-600 text-xs">(000)</span>
                </div>
              </div>

              <hr className="border-gray-800 mb-4" />
              <div className="flex justify-end">
                <button className="text-white text-sm flex items-center gap-2 mt-4 hover:underline">
                  View detailed insights →
                </button>
              </div>
            </div>
          </div>
            <div className="mt-6 mb-10">
            <div className="bg-black p-6 rounded-2xl border border-gray-800">
              <Demographics />
            </div>
          </div>
          </div>
        ) : (
          // Demographics Tab Content
          <div className="mt-6">
            <div className="bg-black p-6 rounded-2xl border border-gray-800">
              <Demographics />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
