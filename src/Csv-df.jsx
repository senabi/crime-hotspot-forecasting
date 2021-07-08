import React from "react";
import useFetch from "./useFetch";
import DataGridVirt from "./DataGridVirt";

function CsvDataframe() {
    const { data: df, isPending: dfIsPending, error: dfError } = useFetch(
        "http://localhost:5002/get_dataset_header"
    );

    return (
        <React.Fragment>
            <div>Head: </div>
            {dfError && <div> {dfError} </div>}
            {dfIsPending && <div> Loading...</div>}
            {df && <DataGridVirt df={df} />}
        </React.Fragment>
    );
}

export default CsvDataframe;
