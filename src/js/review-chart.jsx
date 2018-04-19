/* eslint-env node, browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Review from "./review";
import Plot from "react-plotly.js"; 

class ReviewChart extends Component {
    constructor(props) {
        super(props);

        /* State */
        this.state = {
            batch: props.batch,
            totalDays: props.totalDays,
            intervalMode: props.intervalMode
        };

        /* Bindings */
        this.getSessionReviews = this.getSessionReviews.bind(this);
        this.updateBatch = this.updateBatch.bind(this);
        this.updateTotalDays = this.updateTotalDays.bind(this);
        this.updateIntervalMode = this.updateIntervalMode.bind(this);

        /* Resources */
        this.studySession = new Review();

    }
    getSessionReviews(batch, totalDays, intervalMode) {
        return this.studySession.getReviewSchedule(batch, totalDays, intervalMode);
    }

    parseToNumber(val) {
        // Current stopgap helper for an issue with numbers being rendered as strings
        // Found in this thread: https://github.com/erikras/redux-form/issues/2940
        return isNaN(parseInt(val, 10)) ? null : parseInt(val, 10);
    }
    updateBatch(event) {
        const newBatch = this.parseToNumber(event.target.value);
        this.setState({
            batch: newBatch
        });
    }
    updateTotalDays(event) {
        const newTotalDays = this.parseToNumber(event.target.value);
        this.setState({
            totalDays: newTotalDays
        });
    }
    updateIntervalMode(event) {
        const newIntervalMode = event.target.value;
        this.setState({
            intervalMode: newIntervalMode
        });
    }
    render() {
        const studySessionReviews = this.getSessionReviews(this.state.batch, this.state.totalDays, this.state.intervalMode),
            plotX = [...Array(studySessionReviews.length)
                .fill(undefined)
                .map((item, index) => index + 1)
            ],
            plotY = [...studySessionReviews];
        const getTotalStudied = () => {
            const totalNew = this.state.batch * this.state.totalDays;
            return (
                    <p>At that rate, you will learn {totalNew} flash cards.</p>
                );
        };
        const settingsForm = () => {
            const modes = this.studySession.intervalModes;
            const modeSwitch = () => {
                const validModes = Object.keys(modes)
                    .filter((key) => modes.hasOwnProperty(key) && modes[key].length > 0);
                return validModes.length === 1 ? null : validModes.map((mode, index) => {
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
                    <label>
                        Scheduling Mode:
                        {modeSwitch()}
                    </label>
                    {getTotalStudied()}
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
                {settingsForm()}
            </div>
        );
    }
}
ReviewChart.propTypes = {
    batch: PropTypes.number,
    totalDays: PropTypes.number,
    intervalMode: PropTypes.string
};

export default ReviewChart;