/* eslint-env node */
const Card = require("./card.js");

const CONSTANTS = require("./constants.js");
const intervalModes = CONSTANTS.intervalModes;

const getReviewSchedule = ({batchSize = 20, totalDays = 90, errorRate = 0, intervalMode = "Memrise"}) => {
    const intervals = intervalModes.hasOwnProperty(intervalMode) && intervalModes[intervalMode];
    let reviewsByDay = [0];
    if (intervals) {
        let dailyCards = [];

        for (let i = 0; i < totalDays; i++) {
            reviewsByDay[i] = 0;
            for (let j = 0; j < batchSize; j++) {
                dailyCards.push(new Card(intervals));
            }
            dailyCards.forEach(card => {
                if (card.reviewToday()) {
                    reviewsByDay[i]++;
                }
                card.advanceInterval(errorRate);
            });
        }
    }
    return reviewsByDay;
};

const getResultString = (batchSize, totalDays) => `At this rate you will learn ${batchSize * totalDays} new cards in ${totalDays} day${totalDays === 1 ? "" : "s"}.`;

const getMaxReviewString = (maxReviews, errorRate) =>`Your busiest review day will contain ${maxReviews} card${maxReviews === 1 ? "" : "s"}.${errorRate > 0 ? " (approximation)" : ""}`;

module.exports = {
    getReviewSchedule,
    getResultString,
    getMaxReviewString
};