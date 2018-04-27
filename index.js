/* eslint-env node */
/* global console */
// This is defaults to calculate your SRS schedule based off of the Memrise algorithm: 1, 1, 6, 12, 24, 48, 96, 180, 180, etc
const Review = require("./src/js/review.js");

const myArgs = process.argv.splice(2),
    batchSize = parseInt(myArgs[0]),
    totalDays = parseInt(myArgs[1]),
    mode = myArgs[2];

let studySession = new Review();

studySession.getReviewSchedule(batchSize, totalDays, mode)
    .forEach((reviews, day) => {
        console.log("Day " + (day + 1) + ": Reviews = " + reviews + ", New = " + batchSize); // eslint-disable-line no-console
    });

console.log("At this rate you will learn " + (batchSize * totalDays) + " words in " + totalDays + " days."); // eslint-disable-line no-console