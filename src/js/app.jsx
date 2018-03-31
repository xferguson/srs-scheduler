/* eslint-env node, browser */
/* global Plotly, React, ReactDOM, createPlotlyComponent */
import Review from "./review.js";
// import React from "react";
// import Plot from "react-plotly.js"; 

const Plot = createPlotlyComponent(Plotly),
    studySession = new Review();

let batch = 20,
    totalDays = 90,
    studySessionReviews;

// class ReviewChart extends React.Component { // eslint-disable-line no-unused-vars
//     render() {
//         return (
//             <Plot
//                 data={[
//                   {
//                     x: [1, 2, 3],
//                     y: [2, 6, 3],
//                     type: "scatter",
//                     mode: "lines+points",
//                     marker: {color: "red"},
//                   },
//                   {type: "bar", x: [1, 2, 3], y: [2, 5, 3]},
//                 ]}
//                 layout={ {width: 320, height: 240, title: "A Fancy Plot"} }
//               />
//         );
//     }
// }

studySessionReviews = studySession.getReviewSchedule(batch, totalDays);

ReactDOM.render(
    React.createElement(Plot, {
        data: [{
            type: "bar",
            x: [...Array(studySessionReviews.length)
                .fill(undefined)
                .map((item, index) => index + 1)
            ],
            y: [...studySessionReviews]
        }],
        layout: {
            width: 600,
            height: 480,
            title: "Review Schedule"
        }
    }),
    document.getElementById("root")
);