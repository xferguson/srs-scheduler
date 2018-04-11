/* eslint-env node, browser */
/* global React, ReactDOM*/
// import React from "react";
// import Plot from "react-plotly.js"; 
import ReviewChart from "./review-chart.jsx";

let batch = 20,
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