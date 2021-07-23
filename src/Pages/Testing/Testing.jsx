import React, { useState } from "react";
import useFetch from "../../useFetch";
import MapTimeChart from "./MapTimeChart";
import DistributionCharts from "./DistributionCharts";
import { CrimeTypeContext } from "../../context/CrimeTypeContext";

import "./Testing.css";

function Exploration() {
  const [crimeType, setCrimeType] = useState("ALL");

  const {
    data: pointTimeData,
    isPending: pointTimePending,
    error: pointTimeError,
  } = useFetch();

  // Return the App component.
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="testing">
        <MapTimeChart></MapTimeChart>
        <DistributionCharts></DistributionCharts>
      </div>
    </div>
  );
}

export default Exploration;
