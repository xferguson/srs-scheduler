/* eslint-env node */
/* global console */
// This is defaults to calculate your SRS schedule based off of the Memrise algorithm: 1, 1, 6, 12, 24, 48, 96, 180, 180, etc
const getReviewSchedule = require("./src/js/review.js");

const myArgs = process.argv.splice(2),
    batchSize = parseInt(myArgs[0]) || 20,
    totalDays = parseInt(myArgs[1]) || 90,
    errorRate = parseInt(myArgs[2]) || 0,
    intervalMode = myArgs[3];

console.log(`Running ${batchSize} new cards per day, over ${totalDays} day${totalDays === 1 ? "" : "s"} with a ${errorRate}% error rate.`); // eslint-disable-line no-console

getReviewSchedule({batchSize, totalDays, errorRate, intervalMode})
    .forEach((reviews, day) => {
        console.log("Day " + (day + 1) + ": Reviews = " + reviews + ", New = " + batchSize); // eslint-disable-line no-console
    });

console.log(`At this rate you will learn ${batchSize * totalDays} new cards in ${totalDays} day${totalDays === 1 ? "" : "s"}.`); // eslint-disable-line no-console