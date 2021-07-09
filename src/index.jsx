import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <App />
            </CssBaseline>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
