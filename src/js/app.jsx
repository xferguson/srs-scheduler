/* eslint-env node, browser */
import React from "react";
import ReactDOM from "react-dom";
import ReviewChart from "./review-chart.jsx";

const batch = 20,
    totalDays = 90,
    intervalMode = "Memrise";

ReactDOM.render(
    <ReviewChart
        batch={batch}
        totalDays={totalDays}
        intervalMode={intervalMode}
    />,
    document.getElementById("root")
);