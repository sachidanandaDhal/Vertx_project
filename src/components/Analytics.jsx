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
  const [selectedType, setSelectedType] = useState("Visitors");
  const [selectedDate, setSelectedDate] = useState("Last 30 days");
  const [addedMetrics, setAddedMetrics] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Reference for dropdown container

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="bg-black p-4  rounded-2xl col-span-2 border border-gray-700">
          {/* Dropdowns */}
          <div className="flex gap-4 items-center mb-3">
            <select
              className="bg-black text-white text-sm px-3 py-2 rounded-2xl col-span-2 border border-gray-700"
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
              className="bg-black text-white text-sm px-3 py-2 rounded-2xl col-span-2 border border-gray-700"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dateRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>

            {/* Updated Add Button with Clickable Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="bg-black px-3 py-2 text-sm text-white rounded-2xl col-span-2 border border-gray-700"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                + Add
              </button>

              {dropdownOpen && (
                <div className="absolute mt-2 bg-gray-900 shadow-lg rounded-2xl col-span-2 border border-gray-700 w-40">
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

          {/* Chart */}
          <VisitorsChart selectedType={selectedType} selectedDate={selectedDate} />

          {/* Additional Metrics */}
          {addedMetrics.map((metric) => (
            <VisitorsChart key={metric} selectedType={metric} selectedDate={selectedDate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
