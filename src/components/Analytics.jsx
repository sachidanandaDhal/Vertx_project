import { useState, useEffect, useRef } from "react";
import VisitorsChart from "./VisitorsChart";

const dataTypes = ["Visitors", "Connections", "Interactions", "Impressions"];
const dateRanges = [
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "Last 7 days",
  "Last 30 days",
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedType, setSelectedType] = useState("Visitors");
  const [selectedDate, setSelectedDate] = useState("Last 30 days");
  const [addedMetrics, setAddedMetrics] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Ref for dropdown container

  const handleAddMetric = (metric) => {
    if (!addedMetrics.includes(metric)) {
      setAddedMetrics([...addedMetrics, metric]);
    }
    setDropdownOpen(false); // Close dropdown after selecting
  };

  // Close dropdown when clicking outside
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

  return (
    <div className="bg-black text-white min-h-screen border border-gray-900 ">
      {/* Top Tabs */}
      <div className="flex justify-between items-center text-xs border-b border-gray-900 ">
        <div className="flex space-x-6">
          <button
            className={`px-4 py-2 ${
              activeTab === "Overview"
                ? "border-b-2 border-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("Overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "Demographics"
                ? "border-b-2 border-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("Demographics")}
          >
            Demographics
          </button>
        </div>
        <button className="text-gray-400 pr-5 hover:text-white">More</button>
      </div>

      {/* Overview Tab */}
      {activeTab === "Overview" ? (
        <div className="mt-6 grid grid-cols-3 gap-4 p-3">
          {/* Main Chart Section */}
          <div className="bg-black p-4 rounded-2xl col-span-2 border border-gray-800">
            {/* Dropdowns */}
            <div className="flex gap-4 items-center mb-3">
              <select
                className="bg-black text-white text-xs px-3 py-2 rounded-2xl border border-gray-800"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {dataTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                className="bg-black text-white text-xs px-3 py-2 rounded-2xl border border-gray-800"
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
              <div className="relative" ref={dropdownRef}>
                <button
                  className="bg-black px-3 py-2 text-xs text-white rounded-2xl border border-gray-800"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  + Add
                </button>

                {dropdownOpen && (
                  <div className="absolute mt-2 bg-gray-900 shadow-lg rounded-2xl border border-gray-800 w-40">
                    {dataTypes
                      .filter((metric) => metric !== selectedType)
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
              selectedType={selectedType}
              selectedDate={selectedDate}
            />

            {/* Additional Metrics */}
            {addedMetrics.map((metric) => (
              <VisitorsChart
                key={metric}
                selectedType={metric}
                selectedDate={selectedDate}
              />
            ))}
          </div>

          {/* Insights Section */}
          <div className="bg-black p-6 rounded-2xl border border-gray-800">
            <h1 className="text-2xl font-semibold">Insights</h1>
            <p className="text-2xl font-bold mt-2">Founders: 7.4K</p>
            <p className="text-2xl font-bold mt-2">Investors: 6.09K</p>
            <button className="text-blue-400 mt-4">
              View detailed insights →
            </button>
          </div>
        </div>
      ) : (
        // Demographics Section
        <div className="mt-6">
          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold">Demographics</h2>
            {/* Add Map Component Here */}
            <div className="h-40 bg-gray-800 rounded"></div>
            <ul className="mt-4">
              <li>🇮🇳 India - 40%</li>
              <li>🇺🇸 USA - 25%</li>
              <li>🇨🇦 Canada - 10%</li>
              <li>🇦🇪 UAE - 7%</li>
            </ul>
            <button className="text-blue-400 mt-4">View all countries →</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
