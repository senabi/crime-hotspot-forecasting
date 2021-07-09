import React, { useState, useEffect, useCallback, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

function Preparation() {
    const classes = useStyles();
    const [isSending, setIsSending] = useState("idle");
    const isMounted = useRef(true);
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const kmeansRequest = useCallback(async () => {
        // don't send again while we are sending
        if (isSending === "requesting...") return;
        // update state
        setIsSending("requesting...");
        // send the actual request
        await sendReq();
        // once the request is sent, update state again
        if (isMounted.current)
            // only update if we are still mounted
            setIsSending("done");
    }, [isSending]);

    async function sendReq() {
        const abortCont = new AbortController();
        await fetch("http://localhost:5000/corregir", {
            signal: abortCont.signal,
        })
            .then((res) => {
                if (!res.ok) {
                    // error coming back from server
                    throw Error("could not fetch the data for that resource");
                }
                console.log(res);
                return res.json();
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("fetch aborted");
                } else {
                    // auto catches network / connection error
                    console.log(err);
                }
            });
    }

    function GeocodeMethod() {
        console.log("requesting...");
    }

    return (
        <React.Fragment>
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4" component="h2">
                    Generar Datos
                </Typography>
            </Container>
            <br />
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <div className={classes.root}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            console.log("Generate with kmeans");
                            kmeansRequest();
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
            </Container>
            <Container style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h6" component="h2">
                    Request: {isSending}
                </Typography>
            </Container>
        </React.Fragment>
    );
}

export default Preparation;
