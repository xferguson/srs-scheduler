/* eslint-env node, browser */
/* global Plotly, React, ReactDOM, createPlotlyComponent */
import PropTypes from "prop-types";
import Review from "./review.js";
// import React from "react";
// import Plot from "react-plotly.js"; 

const Plot = createPlotlyComponent(Plotly),
    studySession = new Review();

let batch = 20,
    totalDays = 90;

class ReviewChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            batch: props.batch,
            totalDays: props.totalDays
        };
    }
    getSessionReviews(batch, totalDays) {
        return studySession.getReviewSchedule(batch, totalDays);
    }
    render() {
        const studySessionReviews = this.getSessionReviews(this.state.batch, this.state.totalDays),
            plotX = [...Array(studySessionReviews.length)
                .fill(undefined)
                .map((item, index) => index + 1)
            ],
            plotY = [...studySessionReviews];

        return ( 
            <div>
                <Plot
                    data = {
                        [{
                            type: "bar",
                            x: plotX,
                            y: plotY
                        }]
                    }
                    layout = {
                        {
                            width: 600,
                            height: 480,
                            title: "Review Schedule"
                        }
                    }
                />
            </div>
        );
    }
}
ReviewChart.propTypes = {
    batch: PropTypes.number,
    totalDays: PropTypes.number
};

ReactDOM.render(
    <ReviewChart
        batch={batch}
        totalDays={totalDays}
    /> ,
    document.getElementById("root")
);