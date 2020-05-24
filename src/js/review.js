/* eslint-env node */
const Card = require("./card.js");

const CONSTANTS = require("./constants.js");
const intervalModes = CONSTANTS.intervalModes;

const getReviewSchedule = ({batchSize = 20, totalDays = 90, errorRate = 0, intervalMode = "Memrise"}) => {
    const intervals = intervalModes.hasOwnProperty(intervalMode) && intervalModes[intervalMode];
    if (intervals) {
        let dailyCards = [];
        let reviewsByDay = [0];

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

        return reviewsByDay;
    } else {
        return false;
    }
};

module.exports = getReviewSchedule;