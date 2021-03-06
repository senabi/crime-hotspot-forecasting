import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";

function Home() {
    // Create the count state.
    const [count, setCount] = useState(0);
    // Update the count (+1 every second).
    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);
    // Return the App component.
    return (
        <React.Fragment>
            <p>
                Home Page has been open for <code>{count}</code> seconds.
            </p>
            <Card>hola</Card>
        </React.Fragment>
    );
}

export default Home;
