import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";

function Exploration() {
    // Create the count state.
    const [count, setCount] = useState(0);
    const {
        data: pieData,
        isPending: pieIsPending,
        error: pieError,
    } = useFetch("http://localhost:5002/get_piechart_data");

    const {
        data: barData,
        isPending: barIsPending,
        error: barError,
    } = useFetch("http://localhost:5002/get_barchart_data");

    // Update the count (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);
    // Return the App component.
    return (
        <React.Fragment>
            <p>
                Analisis Exploratorio Page has been open for{" "}
                <code>{count}</code> seconds.
            </p>
            <div>Pie Chart: </div>
            {pieError && <div> {pieError} </div>}
            {pieIsPending && <div>Pie chart Loading...</div>}
            {pieData && <div>Data Loaded</div>}
            <br />
            <div>Bar Chart: </div>
            {barError && <div> {barError} </div>}
            {barIsPending && <div>Bar chart Loading...</div>}
            {barData && <div>Data Loaded</div>}
            <br />
            <div>Plots: </div>
            {pieData && barData && <div>Bois 🥺</div>}
        </React.Fragment>
    );
}

export default Exploration;
