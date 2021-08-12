import React from "react";
import { useContext } from "react";
import useFetch from "../../useFetch";

import "./TimeSelector.css";

import { DateAndCrime } from "../../context/DateAndCrime";

const TimeSelector = () => {
  const { fromDate, toDate, setFromDate, setToDate, crimeType, setCrimeType } =
    useContext(DateAndCrime);

  const fromChange = (event) => {
    var date = new Date(event.target.value);
    setFromDate(date);
  };

  const toChange = (event) => {
    var date = new Date(event.target.value);
    setToDate(date);
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + (d.getDate() + 1),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const handle_select_change = (event) => {
    setCrimeType(event.target.value);
  };

  var params = `?fromMonth=${fromDate.getMonth() + 1}&fromDay=${
    fromDate.getDate() + 1
  }&toMonth=${toDate.getMonth() + 1}&toDay=${toDate.getDate() + 1}`;

  const {
    data: crimesData,
    isPending: crimesIsPending,
    error: crimesError,
  } = useFetch("http://localhost:5000/crime_types" + params);

  return (
    <div className="time-selector">
      <div>
        Desde:
        <br></br>
        <input
          id="fromDate"
          type="date"
          value={formatDate(fromDate)}
          min="2017-01-01"
          max="2017-12-31"
          onChange={fromChange}
        ></input>
      </div>
      <div>
        Hasta:
        <br></br>
        <input
          id="toDate"
          type="date"
          value={formatDate(toDate)}
          min="2017-01-01"
          max="2017-12-31"
          onChange={toChange}
        ></input>
      </div>
      <div>
        {crimesData ? (
          <select
            name="crime_types"
            id="crime_types"
            value={crimeType}
            onChange={handle_select_change}
          >
            {crimesData["crime_types"].map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        ) : (
          <select></select>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
