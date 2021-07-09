import React from "react";
import MetaColumnCard from "./MetaColumnCard";
import { Grid } from "@material-ui/core";

export default function MetaColumnList({ columns, ...other }) {
    return (
        <Grid container spacing={3} {...other}>
            {columns.map((metacol) => (
                <Grid key={metacol.name} item xs={12} sm={6} md={4}>
                    <MetaColumnCard metacol={metacol} />
                </Grid>
            ))}
        </Grid>
    );
}
