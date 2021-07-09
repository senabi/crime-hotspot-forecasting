import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

function useData(df) {
    const [data, setData] = useState({ columns: [], rows: [] });

    useEffect(() => {
        const rows = [];
        const columns = [];
        //const columns = [{ field: "id", hide: true }];
        const headerNames = Object.keys(df[0]);
        //setting column header names
        headerNames.forEach((it, _) => {
            if (it === "ID") {
                columns.push({ field: "id", headerName: it, width: 150 });
            } else {
                columns.push({ field: it, headerName: it, width: 150 });
            }
        });
        df.forEach((it, _) => {
            const Obj = new Object();
            for (const [key, value] of Object.entries(it)) {
                if (key === "ID") {
                    Obj["id"] = value;
                } else {
                    Obj[key] = value;
                }
            }
            rows.push(Obj);
        });

        setData({
            rows,
            columns,
        });
        console.log(data);
        return () => console.log("unmounting...");
    }, []);
    return data;
}

const DataGridVirt = ({ df }) => {
    const data = useData(df);
    return (
        <div style={{ height: 400, width: "100%", color: "white" }}>
            <DataGrid disableSelectionOnClick {...data} columnBuffer={2} />
        </div>
    );
};

export default DataGridVirt;
