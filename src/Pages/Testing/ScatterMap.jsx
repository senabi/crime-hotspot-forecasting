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
          size: 10,
          color: pointsData[key]["color"],
        },
      });
    });
  }

  /* var data = [
    {
      type: "scattermapbox",
      name: "rojo",
      lon: ["-87.6298", "-87.6299"],
      lat: ["41.8781", "41.8782"],
      mode: "markers",
      marker: {
        size: 14,
        color: "red",
      },
      text: "Montreal",
    },
    {
      type: "scattermapbox",
      name: "azul",
      lon: ["-87.6295", "-87.6294"],
      lat: ["41.8784", "41.8783"],
      mode: "markers",
      marker: {
        size: 14,
        color: "blue",
      },
      text: "Montreal",
    },
  ]; */

  const layout = {
    width: 560,
    height: 490,
    hovermode: "closest",
    mapbox: {
      bearing: 0,
      center: {
        lon: -87.6298,
        lat: 41.8781,
      },
      pitch: 0,
      zoom: 10,
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
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
