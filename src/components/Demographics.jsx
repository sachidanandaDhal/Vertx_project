import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import WorldMap from "./WorldMap"; // Custom D3-based map

const demographicsData = [
  { name: "India", percent: 40, flag: "🇮🇳", color: "bg-purple-600" },
  { name: "USA", percent: 25, flag: "🇺🇸", color: "bg-orange-500" },
  { name: "CANADA", percent: 10, flag: "🇨🇦", color: "bg-yellow-400" },
  { name: "UAE", percent: 7, flag: "🇦🇪", color: "bg-green-600" },
];

const colorMap = {
  India: "bg-purple-600",
  USA: "bg-orange-500",
  CANADA: "bg-yellow-400",
  UAE: "bg-green-600",
};

const Demographics = () => {
  const [metric] = useState("Visitors");

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Demographics</h2>
          <div className="relative inline-block">
            <button className="flex items-center gap-1 bg-zinc-900 text-white text-sm px-3 py-1.5 rounded-full border border-zinc-700">
              {metric} <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="w-full h-[250px] sm:h-[300px] md:h-[330px]">
          <WorldMap />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-2 bg-zinc-900 py-2 px-4 rounded-full text-sm">
          {Object.entries(colorMap).map(([country, color]) => (
            <div key={country} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${color}`}></span>
              <span>{country}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {demographicsData.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-lg">{item.flag}</span>
                {item.name}
              </div>
              <span className="text-sm text-zinc-400">{item.percent}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color}`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-end text-sm text-blue-400 hover:underline cursor-pointer">
          View all countries <ArrowRight className="ml-1 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Demographics;
