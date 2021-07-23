import React from "react";
import { useState } from "react";
import ScatterMap from "./ScatterMap";
import TimeSlider from "./TimeSlider";

import { DateRangeContext } from "../../context/DateRangeContext";

import "./MapTimeChart.css";

const MapTimeChart = () => {
  /* Por alguna razón el día está +1 lul */
  const [fromDate, setFromDate] = useState(new Date("2017-01-02"));
  const [toDate, setToDate] = useState(new Date("2017-01-31"));

  return (
    <DateRangeContext.Provider
      value={{ fromDate, setFromDate, toDate, setToDate }}
    >
      <div className="map-time-chart">
        {1 && <ScatterMap />}
        <TimeSlider></TimeSlider>
      </div>
    </DateRangeContext.Provider>
  );
};

export default MapTimeChart;
