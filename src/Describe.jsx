import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Describe = () => {
    const { column } = useParams();
    const { data: description, error, isPending } = useFetch(
        "http://localhost:8000/describe_col/" + column
    );

    return (
        <React.Fragment>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {description && (
                <article>
                    <h2>{description}</h2>
                </article>
            )}
        </React.Fragment>
    );
};

export default Describe;
