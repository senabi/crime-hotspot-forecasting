import React from "react";
import useFetch from "./useFetch";
import DataGridVirt from "./DataGridVirt";

const meta = ({ metaData }) => {
    return <React.Fragment>{JSON.stringify(metaData)}</React.Fragment>;
};

function CsvDataframe() {
    const { data: df, isPending: dfIsPending, error: dfError } = useFetch(
        "http://localhost:5002/get_dataset_header"
    );

    const {
        data: metaData,
        isPending: metaIsPending,
        error: metaError,
    } = useFetch("http://localhost:5002/get_metadata");

    return (
        <React.Fragment>
            <div>Head: </div>
            {dfError && <div> {dfError} </div>}
            {dfIsPending && <div> Loading...</div>}
            {df && <DataGridVirt df={df} />}
            <div>Metadata: </div>
            {metaError && <div> {metaError} </div>}
            {metaIsPending && <div> Loading... </div>}
            {metaData && meta({ metaData })}
        </React.Fragment>
    );
}

export default CsvDataframe;
