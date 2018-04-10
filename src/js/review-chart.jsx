/* eslint-env node, browser */
/* global React, Plotly, createPlotlyComponent */
import PropTypes from "prop-types";
import Review from "./review";

const studySession = new Review();
const Plot = createPlotlyComponent(Plotly);

class ReviewChart extends React.Component {
    constructor(props) {
        super(props);

        /* State */
        this.state = {
            batch: props.batch,
            totalDays: props.totalDays
        };

        /* Bindings */
        this.getSessionReviews = this.getSessionReviews.bind(this);
        this.updateBatch = this.updateBatch.bind(this);
        this.updateTotalDays = this.updateTotalDays.bind(this);
    }
    getSessionReviews(batch, totalDays) {
        return studySession.getReviewSchedule(batch, totalDays);
    }

    parseToNumber(val) {
        // Current stopgap helper for an issue with numbers being rendered as strings
        // Found in this thread: https://github.com/erikras/redux-form/issues/2940
        return isNaN(parseInt(val, 10)) ? null : parseInt(val, 10);
    }
    updateBatch(event) {
        let newBatch = this.parseToNumber(event.target.value);
        this.setState({
            batch: newBatch
        });
    }
    updateTotalDays(event) {
        let newTotalDays = this.parseToNumber(event.target.value);
        this.setState({
            totalDays: newTotalDays
        });
    }
    render() {
        const that = this;
        const studySessionReviews = that.getSessionReviews(that.state.batch, that.state.totalDays),
            plotX = [...Array(studySessionReviews.length)
                .fill(undefined)
                .map((item, index) => index + 1)
            ],
            plotY = [...studySessionReviews];
        function getTotalStudied() {
            const totalNew = that.state.batch * that.state.totalDays;
            return (
                    <p>At that rate, you will learn {totalNew} flash cards.</p>
                );
        }

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
                <form>
                    <label>
                        Daily New Cards:
                        <input type="number" min="0" max="200" value={that.state.batch} onChange={that.updateBatch} />
                    </label>
                    <br />
                    <br />
                    <label>
                        Number of Days:
                        <input type="number" min="0" max="730" value={that.state.totalDays} onChange={that.updateTotalDays} />
                    </label>
                    {getTotalStudied()}
                </form>
            </div>
        );
    }
}
ReviewChart.propTypes = {
    batch: PropTypes.number,
    totalDays: PropTypes.number
};

export default ReviewChart;