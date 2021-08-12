import React from "react";
import { useContext } from "react";

import Plot from "react-plotly.js";
import useFetch from "../../useFetch";

import { DateAndCrime } from "../../context/DateAndCrime";

import "./LineChart.css";

const LineChart = ({ title_label, dimension }) => {
  const { fromDate, toDate, crimeType } = useContext(DateAndCrime);

  var params = `?fromMonth=${fromDate.getMonth() + 1}&fromDay=${
    fromDate.getDate() + 1
  }&toMonth=${toDate.getMonth() + 1}&toDay=${
    toDate.getDate() + 1
  }&crimeType=${crimeType}&dimension=${dimension}`;

  const {
    data: densitiesData,
    isPending: densitiesIsPending,
    error: densitiesError,
  } = useFetch("http://localhost:5000/kde_densities" + params);

  var data = [];
  if (densitiesData) {
    data = [
      {
        type: "scatter",
        x: densitiesData["x"],
        y: densitiesData["y"],
      },
    ];
  }

  const layout = {
    width: 480,
    height: 280,
    margin: {
      l: 20,
      r: 0,
      b: 15,
      t: 30,
    },
    title: title_label,
    font: { size: 10 },
  };
  const config = {};
  return (
    <div className="line-chart">
      <Plot data={data} layout={layout} config={config}></Plot>
    </div>
  );
};

export default LineChart;
