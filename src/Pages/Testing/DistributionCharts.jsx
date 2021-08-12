import React from "react";
import { useState } from "react";
import HeatMapAndBars from "./HeatMapAndBars";
import SliderAndCharts from "./SliderAndCharts";

import "./DistributionCharts.css";

import { DateAndCrime } from "../../context/DateAndCrime";

const DistributionCharts = () => {
  const [fromDate, setFromDate] = useState(new Date("2017-01-02"));
  const [toDate, setToDate] = useState(new Date("2017-01-31"));
  const [crimeType, setCrimeType] = useState("-");

  return (
    <DateAndCrime.Provider
      value={{
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        crimeType,
        setCrimeType,
      }}
    >
      <div className="distribution-charts">
        <HeatMapAndBars></HeatMapAndBars>
        <SliderAndCharts></SliderAndCharts>
      </div>
    </DateAndCrime.Provider>
  );
};

export default DistributionCharts;
