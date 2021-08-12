import React from "react";

import Plot from "react-plotly.js";
import useFetch from "../../useFetch";
import "./FreqBars.css";

const FreqBars = () => {
  const {
    data: crimesHourData,
    isPending: crimesHourIsPending,
    error: crimesHourError,
  } = useFetch("http://localhost:5000/hour/crimes");

  const hour_str = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];

  var data = [];

  if (crimesHourData) {
    Object.keys(crimesHourData).forEach((key) => {
      data.push({
        type: "bar",
        name: key,
        x: hour_str,
        y: crimesHourData[key],
      });
    });
  }

  const layout = {
    width: 943,
    height: 345,
    barmode: "stack",
    margin: { l: 40, r: 10, t: 30, b: 20 },
    title: "Tipo de Crímen vs Hora"
  };

  return (
    <div className="freq-bars">
      <Plot data={data} layout={layout}></Plot>
    </div>
  );
};

export default FreqBars;
