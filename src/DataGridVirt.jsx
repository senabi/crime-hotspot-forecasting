import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

//function useData(rowLength, columnLength) {
//const [data, setData] = useState({ columns: [], rows: [] });

//React.useEffect(() => {
//const rows = [];

//for (let i = 0; i < rowLength; i += 1) {
//const row = {
//id: i,
//};
//for (let j = 1; j <= columnLength; j += 1) {
//row[`price${j}M`] = `${i.toString()}, ${j} `;
//}
//rows.push(row);
//}

//const columns = [{ field: "id", hide: true }];

//for (let j = 1; j <= columnLength; j += 1) {
//columns.push({ field: `price${j}M`, headerName: `${j}M` });
//}

//setData({
//rows,
//columns,
//});
////console.log(data);
//}, [rowLength, columnLength]);

//return data;
//}
//
//

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "first", headerName: "firts" },
];
const rows = [{}, {}];

const DataGridVirt = ({ df }) => {
    const data = [columns, rows];
    //const data = useData(5, 3);
    //console.log(data);

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid {...data} columnBuffer={2} />
        </div>
    );
};

export default DataGridVirt;
