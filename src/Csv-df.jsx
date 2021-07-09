import React from "react";
import useFetch from "./useFetch";
import DataGridVirt from "./DataGridVirt";
import MetaColumnList from "./MetaColumnList";
import MetadataCard from "./MetadataCard";
import { Container, Typography } from "@material-ui/core";

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
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4" component="h2">
                    Head
                </Typography>
            </Container>
            {dfError && <div> {dfError} </div>}
            {dfIsPending && <div> Loading...</div>}
            {df && (
                <Container>
                    <DataGridVirt df={df} />{" "}
                </Container>
            )}
            <br />
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4" component="h2">
                    Chicago Crime Dataset Metadata{" "}
                </Typography>
            </Container>
            {metaError && <div> {metaError} </div>}
            {metaIsPending && <div> Loading... </div>}
            {metaData && (
                <Container
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <MetadataCard metadata={metaData.metadata} />
                </Container>
            )}
            <br />
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4" component="h2">
                    Columnas{" "}
                </Typography>
            </Container>
            {metaError && <div> {metaError} </div>}
            {metaIsPending && <div> Loading... </div>}
            {metaData && (
                <Container>
                    <MetaColumnList columns={metaData.columns} />
                </Container>
            )}
        </React.Fragment>
    );
}

export default CsvDataframe;
