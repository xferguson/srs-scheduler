/* eslint-env node, browser */
import React from "react";
import ReactDOM from "react-dom";
import ReviewChart from "./review-chart.jsx";

const batchSize = 20,
    totalDays = 90,
    errorRate = 0,
    intervalMode = "Memrise",
    learningDaysPerWeek = 7;

ReactDOM.render(
    <ReviewChart
        batchSize={batchSize}
        totalDays={totalDays}
        errorRate={errorRate}
        intervalMode={intervalMode}
        learningDaysPerWeek={learningDaysPerWeek}
    />,
    document.getElementById("root")
);