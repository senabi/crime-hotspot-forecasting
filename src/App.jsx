import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import PreAnalysis from "./PreAnalysis";
import Preparation from "./Preparation";
import Exploration from "./Exploration";
import Testing from "./Pages/Testing/Testing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import { Box, Button } from "@material-ui/core";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Box m={2} pt={3}>
                    <Button color="default"></Button>
                </Box>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/preanalysis" component={PreAnalysis} />
                    <Route path="/preparation" component={Preparation} />
                    <Route path="/exploration" component={Testing} />
                    <Route path="/testing" component={Testing} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
