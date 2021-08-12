import React from "react";
import Plot from "react-plotly.js";

import useFetch from "../../useFetch";

import "./FreqMap.css";

const FreqMap = () => {

  const {
    data: recountData,
    isPending: recountIsPending,
    error: recountError,
  } = useFetch("http://localhost:5000/map_crime_recount");


  var data = []
  if (recountData) {
    data = [{
      type: "choroplethmapbox",
      locations: recountData['location'],
      z: recountData['count'],
      geojson: "https://raw.githubusercontent.com/senabi/tmp-flask-react/main/public/ward_bound.geo.json"
    }]
  }

  
  var layout = {
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
    width: 620,
    height: 600,
  };

  var config = {
    mapboxAccessToken:
      "pk.eyJ1Ijoia2hhbm5vbSIsImEiOiJja3I2dDViYmkzajZoMnJsZnl3djk5c3dqIn0.zbA7SpcrApjt4dDRPtkOOg",
  };

  return (
    <div className="freq-map">
      <Plot data={data} layout={layout} config={config}></Plot>
    </div>
  );
};

export default FreqMap;
