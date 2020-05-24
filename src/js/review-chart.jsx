/* eslint-env node, browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js"; 
import getReviewSchedule from "./review";
import { intervalModes } from "./constants.js";

const parseToNumber = (val) => isNaN(parseInt(val, 10)) ? null : parseInt(val, 10);

class ReviewChart extends Component {
    constructor(props) {
        super(props);

        /* State */
        this.state = {
            batch: props.batch,
            totalDays: props.totalDays,
            errorRate: props.errorRate,
            intervalMode: props.intervalMode
        };

        /* Bindings */
        this.updateBatch = this.updateBatch.bind(this);
        this.updateTotalDays = this.updateTotalDays.bind(this);
        this.updateErrorRate = this.updateErrorRate.bind(this);
        this.updateIntervalMode = this.updateIntervalMode.bind(this);

    }

    updateBatch(event) {
        const newBatch = parseToNumber(event.target.value);
        this.setState({
            batch: newBatch
        });
    }
    updateTotalDays(event) {
        const newTotalDays = parseToNumber(event.target.value);
        this.setState({
            totalDays: newTotalDays
        });
    }
    updateErrorRate(event) {
        const newErrorRate = parseToNumber(event.target.value);
        this.setState({
            errorRate: newErrorRate
        });
    }
    updateIntervalMode(event) {
        const newIntervalMode = event.target.value;
        this.setState({
            intervalMode: newIntervalMode
        });
    }
    render() {
        const studySessionReviews = getReviewSchedule({
                batchSize: this.state.batch,
                totalDays: this.state.totalDays,
                errorRate: this.state.errorRate,
                intervalMode: this.state.intervalMode
            }),
            plotX = studySessionReviews
                .map((item, index) => index + 1),
            plotReviewCardsY = studySessionReviews,
            plotNewCardsY = Array(studySessionReviews.length)
                .fill(this.state.batch);
        const settingsForm = () => {
            const modeSwitch = () => {
                const validModes = Object.keys(intervalModes)
                    .filter((key) => intervalModes.hasOwnProperty(key) && intervalModes[key].length > 0);
                return validModes.length > 1 && validModes.map((mode, index) => {
                        return (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name="mode"
                                    value={mode}
                                    onChange={this.updateIntervalMode}
                                    checked={mode === this.state.intervalMode}
                                />{mode}
                            </div>
                        );
                    });
            };
            return (
                <form>
                    <div>
                        <label>
                            Daily New Cards:
                            <input
                                type="number"
                                min="0"
                                max="200"
                                value={this.state.batch}
                                onChange={this.updateBatch}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Number of Days:
                            <input
                                type="number"
                                min="0"
                                max="730"
                                value={this.state.totalDays}
                                onChange={this.updateTotalDays}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Error Rate (% of cards wrong per day):
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={this.state.errorRate}
                                onChange={this.updateErrorRate}
                            />
                        </label>
                    </div>                    <label>
                        Scheduling Mode:
                        {modeSwitch()}
                    </label>
                    <p>At that rate, you will learn {this.state.batch * this.state.totalDays} new cards.</p>
                </form>
            );
        };

        return ( 
            <div>
                <Plot
                    data = {
                        [{
                            type: "bar",
                            x: plotX,
                            y: plotNewCardsY,
                            name: "New Cards"
                        },
                        {
                            type: "bar",
                            x: plotX,
                            y: plotReviewCardsY,
                            name: "Cards to Review"
                        }]
                    }
                    layout = {
                        {
                            width: 600,
                            height: 480,
                            title: "Review Schedule",
                            barmode: "stack"
                        }
                    }
                />
                {settingsForm()}
            </div>
        );
    }
}
ReviewChart.propTypes = {
    batch: PropTypes.number,
    totalDays: PropTypes.number,
    errorRate: PropTypes.number,
    intervalMode: PropTypes.string
};

export default ReviewChart;