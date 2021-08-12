import React, { useState } from "react";
import MapTimeChart from "./MapTimeChart";
import DistributionCharts from "./DistributionCharts";
import FreqMap from "./FreqMap"

import "./Testing.css";

function Exploration() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="testing">
        <MapTimeChart></MapTimeChart>
        <DistributionCharts></DistributionCharts>
        <FreqMap></FreqMap>
      </div>
    </div>
  );
}

export default Exploration;
