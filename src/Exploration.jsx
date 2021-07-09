import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";
import PieChart from "./Components/PieChart/PieChart";
import BarChart from "./Components/BarChart/BarChart";
import MapChart from "./Components/MapChart/MapChart";
import chicagoGeojson from "./Components/MapChart/Boundaries.geo.json";
import { CrimeTypeContext } from "./context/CrimeTypeContext";

function Exploration() {
  const [crimeType, setCrimeType] = useState("ALL");

  const {
    data: pieData,
    isPending: pieIsPending,
    error: pieError,
  } = useFetch("http://localhost:5000/get/crime_recount/type");

  const {
    data: barData,
    isPending: barIsPending,
    error: barError,
  } = useFetch("http://localhost:5000/get/crime_recount/type/month");
  console.log(crimeType);

  const {
    data: pointData,
    isPending: pointIsPending,
    error: pointError,
  } = useFetch("http://localhost:5000/coords/crime_type");
  // Return the App component.
  return (
    <CrimeTypeContext.Provider value={{ crimeType, setCrimeType }}>
      <React.Fragment>
        <div>Pie Chart: </div>
        {pieError && <div> {pieError} </div>}
        {pieIsPending && <div>Pie chart Loading...</div>}
        {pieData && (
          <div>
            <PieChart data_recount={pieData} />
          </div>
        )}

        <br />
        <div>Bar Chart: </div>
        {barError && <div> {barError} </div>}
        {barIsPending && <div>Bar chart Loading...</div>}
        {barData && (
          <div>
            <BarChart data_recount={barData} />
          </div>
        )}

        <br />
        <div>Map Chart: </div>
        {pointData && <MapChart data={chicagoGeojson} points={pointData} />}
      </React.Fragment>
    </CrimeTypeContext.Provider>
  );
}

export default Exploration;
