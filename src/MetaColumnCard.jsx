import React from "react";

import { Box, Card, Typography, CardContent } from "@material-ui/core";
//import Label from "./Label";

export default function MetaColumnCard({ metacol }) {
    //const {
    //25_percentile,
    //50_percentile,
    //75_percentile,
    //max,
    //mean,
    //min,
    //name,
    //nan_count,
    //rows_count,
    //type,
    //} = metacol;
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {metacol["type"]}
                </Typography>
                <Typography variant="h5" component="h2">
                    {metacol["name"]}
                </Typography>
                <Typography color="textSecondary">
                    count: {metacol["rows_count"]}
                </Typography>
                <Typography color="textSecondary">
                    nan count: {metacol["nan_count"]}
                </Typography>
                <Typography color="textSecondary">
                    25%: {metacol["25_percentile"]}
                </Typography>
                <Typography color="textSecondary">
                    50%: {metacol["50_percentile"]}
                </Typography>
                <Typography color="textSecondary">
                    75%: {metacol["75_percentile"]}
                </Typography>
                <Typography color="textSecondary">
                    max: {metacol["max"]}
                </Typography>
                <Typography color="textSecondary">
                    min: {metacol["min"]}
                </Typography>
                <Typography color="textSecondary">
                    mean: {metacol["mean"]}
                </Typography>
            </CardContent>
        </Card>
    );
}
