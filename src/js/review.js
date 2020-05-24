/* eslint-env node */
import Card from "./card.js";
import { intervalModes } from "./constants.js";

export const getReviewSchedule = (batchSize, days, mode = "Memrise") => {
    const intervals = intervalModes.hasOwnProperty(mode) && intervalModes[mode];
    if (intervals) {
        let dailyCards = [];
        let reviewsByDay = [0];

        for (let i = 0; i < days; i++) {
            reviewsByDay[i] = 0;
            for (let j = 0; j < batchSize; j++) {
                dailyCards.push(new Card(intervals));
            }
            dailyCards.forEach(card => {
                if (card.reviewToday()) {
                    reviewsByDay[i]++;
                }
                card.advanceInterval();
            });
        }

        return reviewsByDay;
    } else {
        return false;
    }
};
