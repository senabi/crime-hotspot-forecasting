import React from "react";
import { useContext } from "react";

import "./TimeSlider.css";

import { DateRangeContext } from "../../context/DateRangeContext";

const TimeSlider = () => {
  const { fromDate, toDate, setFromDate, setToDate } =
    useContext(DateRangeContext);

  const fromChange = (event) => {
    var date = new Date(event.target.value);
    setFromDate(date);
  };

  const toChange = (event) => {
    var date = new Date(event.target.value);
    setToDate(date);
  };

  /* format: YYYY-MM-DD */
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + (d.getDate() + 1),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div className="time-slider">
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
    </div>
  );
};

export default TimeSlider;
