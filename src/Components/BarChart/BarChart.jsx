import React from "react";
import { useContext } from "react";

import { Bar } from "react-chartjs-2";
import { CrimeTypeContext } from "../../context/CrimeTypeContext";

const BarChart = (props) => {
  const { crimeType } = useContext(CrimeTypeContext);

  console.log("Rendering Barchart");
  const { data_recount } = props;

  const month_labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const crime_month_recount = data_recount[crimeType];
  console.log(crime_month_recount);
  var month_recounts = [];

  Object.keys(crime_month_recount).forEach((key) => {
    month_recounts.push(crime_month_recount[key]);
  });

  const data = {
    labels: month_labels,
    datasets: [
      {
        label: "# crimes",
        data: month_recounts,
        backgroundColor: ["red", "blue", "green", "purple", "yellow"],
        borderColor: ["red", "blue", "green", "purple", "yellow"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div>
      <Bar data={data} height={300} width={300} options={options}></Bar>
    </div>
  );
};

export default BarChart;
