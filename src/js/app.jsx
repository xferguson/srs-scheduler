/* eslint-env node, browser */
/* global Plotly, React, ReactDOM, createPlotlyComponent */
import Review from "./review.js";
// import React from "react";
// import Plot from "react-plotly.js"; 

const Plot = createPlotlyComponent(Plotly),
    studySession = new Review();

let batch = 20,
    totalDays = 20,
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
                type: "scatter",
                mode: "lines+points",
                x: [...Array(studySessionReviews.length).keys()],
                y: [...studySessionReviews],
                marker: { color: "red" }
            },
            {
                type: "bar",
                x: [...Array(studySessionReviews.length).keys()],
                y: [...studySessionReviews]
            }
        ],
        layout: {
            width: 640,
            height: 480,
            title: "A Flashcard Schedule"
        }
    }),
    document.getElementById("root")
);