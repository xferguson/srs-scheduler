/* eslint-env node */
import Batch from "./batch.js";
import { intervalModes } from "./constants.js";

export const getReviewSchedule = (batchSize, days, mode = "Memrise") => {
    const intervals = intervalModes.hasOwnProperty(mode) && intervalModes[mode];
    if (intervals) {
        let dailyBatches = [];
        let reviewsByDay = [0];

        for (let i = 0; i < days; i++) {
            dailyBatches.push(new Batch(batchSize, intervals));
            for (var d = 0; d < dailyBatches.length; d++) {
                reviewsByDay[i] = reviewsByDay[i] ? reviewsByDay[i] + dailyBatches[d].reviewsToday() : 0 + dailyBatches[d].reviewsToday();
                dailyBatches[d].advanceInterval();
            }
        }

        return reviewsByDay;
    } else {
        return false;
    }
};
