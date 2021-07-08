import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

function Preparation() {
    const classes = useStyles();
    // Create the count state.
    const [count, setCount] = useState(0);
    // Update the count (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);
    // Return the App component.

    function RandomMethod() {
        console.log("requesting...");
    }

    function GeocodeMethod() {
        console.log("requesting...");
    }

    return (
        <React.Fragment>
            <p>
                Preparation Page has been open for <code>{count}</code> seconds.
            </p>
            <div className={classes.root}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        console.log("Generate Random");
                        RandomMethod();
                    }}
                >
                    Gen. Cluster
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        console.log("Generate using geocode");
                        GeocodeMethod();
                    }}
                >
                    Gen. Geocode
                </Button>
            </div>
        </React.Fragment>
    );
}

export default Preparation;
