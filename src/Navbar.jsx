import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    CssBaseline,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
    {
        label: "Pre-analysis",
        href: "/preanalysis",
    },
    {
        label: "Preparation",
        href: "/preparation",
    },
    {
        label: "Exploration",
        href: "/exploration",
    },
];

const useStyles = makeStyles(() => ({
    header: {
        //backgroundColor: "#282828",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function Navbar() {
    const { header, toolbar } = useStyles();
    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {Chicago}
                {getMenuButtons()}
            </Toolbar>
        );
    };
    const Chicago = (
        <Button component={RouterLink} to="/">
            <Typography variant="h6" component="h1">
                Chicago Crime
            </Typography>
        </Button>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        //className: menuButton,
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <React.Fragment>
            <CssBaseline>
                <AppBar className={header}>{displayDesktop()}</AppBar>
            </CssBaseline>
        </React.Fragment>
    );
}
