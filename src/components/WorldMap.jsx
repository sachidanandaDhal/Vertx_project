import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import worldData from "../data/world-110m.json"; // this is a TopoJSON file

const locations = [
  { name: "India", coords: [78.9629, 20.5937], color: "purple" },
  { name: "USA", coords: [-95.7129, 37.0902], color: "orange" },
  { name: "Canada", coords: [-106.3468, 56.1304], color: "yellow" },
  { name: "UAE", coords: [53.8478, 23.4241], color: "green" },
];

export default function WorldMap() {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 600;
    const height = 300;

    const projection = d3.geoMercator().scale(100).translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);

    const countries = feature(worldData, worldData.objects.countries).features;

    // SVG setup
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background", "transparent");

    svg
      .selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#222")
      .attr("stroke", "#444")
      .attr("stroke-width", 0.3);

    // Add circular dots
    svg
      .selectAll("circle")
      .data(locations)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection(d.coords)[0])
      .attr("cy", (d) => projection(d.coords)[1])
      .attr("r", 6)
      .attr("fill", (d) => d.color)
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);
  }, []);

  return (
    <div className="bg-black p-1 rounded-2xl border border-gray-800">
      <svg ref={ref} className="w-full h-72" />
    </div>
  );
}
