import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import useFetch from "./useFetch";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein, e1, e2, e3) {
    return { name, calories, fat, carbs, protein, e1, e2, e3 };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 1, 1, 1),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 1, 1, 1),
    createData("Eclair", 262, 16.0, 24, 6.0, 1, 1, 1),
    createData("Cupcake", 305, 3.7, 67, 4.3, 1, 1, 1),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 1, 1, 1),
];

const cols = ["name", "calories", "fat", "carbs", "protein", "e1", "e2", "e3"];

function PreAnalysis() {
    const classes = useStyles();
    // Create the count state.
    const [count, setCount] = useState(0);
    const [column, setColumn] = useState(null);
    // Update the count (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);

    const {
        data: dataHead,
        isPending: dataHeadIsPending,
        error: dataError,
    } = useFetch("http://localhost:5002/get_data_head");

    // Return the App component.
    return (
        <React.Fragment>
            <p>
                Pre-Analysis Page has been open for <code>{count}</code>{" "}
                seconds.
            </p>
            <div>Head:</div>
            {dataError && <div> {dataError} </div>}
            {dataHeadIsPending && <div>Data Head Loading...</div>}
            {dataHead && <div>Data Loaded</div>}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">
                                Protein&nbsp;(g)
                            </TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">
                                    {row.protein}
                                </TableCell>
                                <TableCell align="right">{row.e1}</TableCell>
                                <TableCell align="right">{row.e2}</TableCell>
                                <TableCell align="right">{row.e3}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <div>Seleccionar atributo:</div>
            <br />
            <div>Descripción:</div>
        </React.Fragment>
    );
}

export default PreAnalysis;
