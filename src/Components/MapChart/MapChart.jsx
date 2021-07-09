import { geoMercator, geoPath, select } from "d3";
import React, { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { CrimeTypeContext } from "../../context/CrimeTypeContext";

const MapChart = ({ data, points }) => {
  const { crimeType } = useContext(CrimeTypeContext);
  console.log("Rendering Map");

  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const height = 550;
    const width = 630;
    const projection = geoMercator()
      .scale(width * 80)
      .center([-87.6298, 41.8781])
      .translate([width / 2, height / 2.5]);
    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".ward")
      .data(data.features)
      .join("path")
      .attr("class", "ward")
      .attr("fill", "blue")
      .attr("d", (feature) => pathGenerator(feature))
      .style("stroke", "white")
      .style("stroke-width", 1.2)
      .on("mouseover", function (d) {
        select(this).style("cursor", "pointer").attr("fill", "red");
      })
      .on("mouseout", function (d) {
        select(this).attr("fill", "blue");
      });

    var temp = crimeType;
    if (crimeType == "ALL") {
      temp = "ARSON";
    }
    console.log("puntos");
    console.log(points[temp]);
    var circles = svg
      .selectAll("circle")
      .data(points[temp])
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d[0], d[1]])[0];
      })
      .attr("cy", function (d) {
        return projection([d[0], d[1]])[1];
      })
      .attr("r", 2)
      .style("fill", "green");
  }, [data, crimeType]);

  return <svg ref={svgRef} width="630" height="550"></svg>;
};

export default MapChart;
