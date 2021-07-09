import React from "react";

import { Card, Typography, CardContent, Grid } from "@material-ui/core";
//import Label from "./Label";

export default function MetadataCard({ metadata }) {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary">
                    Num Columnas: {metadata["columns_count"]}
                </Typography>
                <Typography color="textSecondary">
                    Num Filas: {metadata["rows_count"]}
                </Typography>
                <Typography color="textSecondary">Columnas:</Typography>

                <Grid container spacing={2}>
                    <Grid item>
                        <div>
                            <Grid container spacing={5}>
                                {metadata.column_names.map((name) => (
                                    <Grid key={name} item xs={12} sm={6} md={2}>
                                        <Card
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography>{name}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
