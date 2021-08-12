import React from "react";

import HeatMap from "./HeatMap";
import FreqBars from "./FreqBars";

import "./HeatMapAndBars.css";

const HeatMapAndBars = () => {
  return (
    <div className="heat-map-and-bars">
      <HeatMap></HeatMap>
      <FreqBars></FreqBars>
    </div>
  );
};

export default HeatMapAndBars;
