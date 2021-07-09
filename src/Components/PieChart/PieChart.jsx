import React from "react";
import { useContext } from "react";

import { Pie } from "react-chartjs-2";
import { CrimeTypeContext } from "../../context/CrimeTypeContext";

const PieChart = (props) => {
  const {setCrimeType} = useContext(CrimeTypeContext)

  console.log("Rendering PieChart");
  const { data_recount } = props;
  
  var labels = Object.keys(data_recount);
  var labelsValues = Object.values(data_recount);

  var arrayOfObj = labels.map(function(d, i) {
    return {
      label: d,
      data: labelsValues[i] || 0
    };
  });
  
  var sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
    return b.data - a.data;
  });
  
  var newArrayLabel = [];
  var newArrayData = [];
  sortedArrayOfObj.forEach(function(d){
    newArrayLabel.push(d.label);
    newArrayData.push(d.data);
  });

  const data = {
    labels: newArrayLabel,
    datasets: [
      {
        label: "# crimes",
        data: newArrayData,
        backgroundColor: ["red", "blue", "green", 'purple', 'yellow'],
        borderColor: ["red", "blue", "green", 'purple', 'yellow'],
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
    onClick: (event, element) => {
      if (element.length > 0) {
        var elementIndex = element[0].index;
        const label = data.labels[elementIndex];
        const value = data.datasets[0].data[elementIndex]
        setCrimeType(data.labels[elementIndex])
      }
    },
  };
  return (
    <div>
      <Pie data={data} height={300} width={300} options={options}></Pie>
    </div>
  );
};

export default PieChart;
