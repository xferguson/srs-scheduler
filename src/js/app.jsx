/* eslint-env node, browser */
/* global console, Plotly, React, ReactDOM, createPlotlyComponent */
import {Review} from "./review.js";
// import React from "react";
// import Plot from "react-plotly.js"; 

let studySession,
    batch = 20,
    totalDays = 20;
    // studySessionReviews;

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

const Plot = createPlotlyComponent(Plotly);

ReactDOM.render(
  React.createElement(Plot, {
    data: [
      {
        type: "scatter",
        mode: "lines+points",
        x: [1, 2, 3],
        y: [2, 6, 3],
        marker: {color: "red"}
      },
      {
        type: "bar",
        x: [1, 2, 3],
        y: [2, 5, 3]
      }
    ],
    layout: {
      width: 640,
      height: 480,
      title: "A Fancy Plot"
    }
  }),
  document.getElementById("root")
);

studySession = new Review();
// studySessionReviews = studySession.getReviewSchedule(batch, totalDays);
studySession.getReviewSchedule(batch, totalDays);
// console.log("At this rate you will learn " + (batch * totalDays) + " words in " + totalDays + " days.");