import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#90CAF9",
        },
        secondary: {
            main: "#F48FB1",
        },
    },
    typography: {
        fontFamily: `"Product Sans", "Helvetica", "Arial", sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
});
export default theme;
