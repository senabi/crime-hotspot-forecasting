import React from "react";
import { useContext } from "react";

import Plot from "react-plotly.js";
import useFetch from "../../useFetch";

import "./ScatterMap.css";
import { DateRangeContext } from "../../context/DateRangeContext";

const ScatterMap = () => {
  const { fromDate, toDate } = useContext(DateRangeContext);

  var params = `?fromMonth=${fromDate.getMonth() + 1}&fromDay=${
    fromDate.getDate() + 1
  }&toMonth=${toDate.getMonth() + 1}&toDay=${toDate.getDate() + 1}`;

  const {
    data: pointsData,
    isPending: pointsIsPending,
    error: pointsError,
  } = useFetch("http://localhost:5000/coords/crime_type2" + params);

  var data = [];
  if (pointsData) {
    Object.keys(pointsData).forEach((key) => {
      data.push({
        type: "scattermapbox",
        name: key,
        lon: pointsData[key]["longs"],
        lat: pointsData[key]["lats"],
        mode: "markers",
        marker: {
          size: 5,
          color: pointsData[key]["color"],
        },
      });
    });
  }

  const layout = {
    width: 610,
    height: 900,
    hovermode: "closest",
    mapbox: {
      bearing: 0,
      center: {
        lon: -87.6298,
        lat: 41.8380,
      },
      pitch: 0,
      zoom: 9,
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    legend: {
      
    },
  };

  const config = {
    mapboxAccessToken:
      "pk.eyJ1Ijoia2hhbm5vbSIsImEiOiJja3I2dDViYmkzajZoMnJsZnl3djk5c3dqIn0.zbA7SpcrApjt4dDRPtkOOg",
  };

  return (
    <div className="scatter-map">
      <Plot data={data} layout={layout} config={config}></Plot>
    </div>
  );
};

export default ScatterMap;
