/* eslint-env node */
/* global console */
// This is defaults to calculate your SRS schedule based off of the Memrise algorithm: 1, 1, 6, 12, 24, 48, 96, 180, 180, etc
const review = require("./src/js/review.js");
const { getLearningDays } = require("./src/js/review.js");

const myArgs = process.argv.splice(2),
    batchSize = parseInt(myArgs[0]) || 20,
    totalDays = parseInt(myArgs[1]) || 90,
    errorRate = parseInt(myArgs[2]) || 0,
    intervalMode = myArgs[3],
    learningDaysPerWeek = parseInt(myArgs[4]) || 7;

    const learningDays = getLearningDays(totalDays, learningDaysPerWeek);

console.log(`Running ${batchSize} new cards per day, over ${totalDays} day${totalDays === 1 ? "" : "s"} with a ${errorRate}% error rate.`); // eslint-disable-line no-console

const totalReviews = review.getReviewSchedule({batchSize, totalDays, errorRate, intervalMode, learningDaysPerWeek}) || [];

totalReviews.forEach((dailyReview, day) => {
        const newCount = learningDays.includes(day) ? batchSize : 0;
        console.log("Day " + (day + 1) + ": Reviews = " + dailyReview + ", New = " + newCount); // eslint-disable-line no-console
    });
const maxReviews = Math.max(...totalReviews);

console.log(review.getResultString(batchSize, totalDays, learningDays.length)); // eslint-disable-line no-console
console.log(review.getMaxReviewString(maxReviews, errorRate)); // eslint-disable-line no-console