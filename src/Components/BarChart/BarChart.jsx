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
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
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
