import React from "react";
import LineChart from "./LineChart";
import TimeSelector from "./TimeSelector";

import "./SliderAndCharts.css";

const SliderAndCharts = () => {
  return (
    <div className="slider-and-charts">
      <TimeSelector></TimeSelector>
      <LineChart title_label="Densidad con respecto a la latitud" dimension="x"></LineChart>
      <LineChart title_label="Densidad con respecto a la longitud" dimension="y"></LineChart>
      <LineChart title_label="Densidad con respecto al tiempo" dimension="t"></LineChart>
    </div>
  );
};

export default SliderAndCharts;
