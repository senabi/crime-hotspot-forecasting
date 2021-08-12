import React from "react";
import { useContext } from "react";

import Plot from "react-plotly.js";
import useFetch from "../../useFetch";

import { DateAndCrime } from "../../context/DateAndCrime";

import "./HeatMap.css";

const HeatMap = () => {
  const { fromDate, toDate, crimeType } = useContext(DateAndCrime);

  var params = `?fromMonth=${fromDate.getMonth() + 1}&fromDay=${
    fromDate.getDate() + 1
  }&toMonth=${toDate.getMonth() + 1}&toDay=${
    toDate.getDate() + 1
  }&crimeType=${crimeType}`;

  const {
    data: heatMapData,
    isPending: heatMapIsPending,
    error: heatMapError,
  } = useFetch("http://localhost:5000/heat_map_densities" + params);

  var data = [];
  if (heatMapData) {
    data = [
      {
        type: "densitymapbox",
        lat: heatMapData['x'],
        lon: heatMapData['y'],
        z: heatMapData['z'],
        radius: 20,
      },
    ];
  }

  const layout = {
    width: 943,
    height: 655,
    mapbox: {
      bearing: 0,
      center: {
        lon: -87.6298,
        lat: 41.838,
      },
      pitch: 0,
      zoom: 9,
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
  };

  const config = {
    mapboxAccessToken:
      "pk.eyJ1Ijoia2hhbm5vbSIsImEiOiJja3I2dDViYmkzajZoMnJsZnl3djk5c3dqIn0.zbA7SpcrApjt4dDRPtkOOg",
  };

  return (
    <div className="heat-map">
      <Plot data={data} layout={layout} config={config}></Plot>
    </div>
  );
};

export default HeatMap;
