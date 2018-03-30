/* eslint-env node */
/* global console */
// This is designed to calculate your SRS schedule based off of the Memrise algorithm: 1, 1, 6, 12, 24, 48, 96, 180, 180, etc
const Review = require("./src/js/review.js");

const myArgs = process.argv.splice(2),
	batch = parseInt(myArgs[0]),
	totalDays = parseInt(myArgs[1]);
let studySession;//,
	// studySessionReviews;

studySession = new Review();
// studySessionReviews = studySession.getReviewSchedule(batch, totalDays);
studySession.getReviewSchedule(batch, totalDays);
console.log("At this rate you will learn " + (batch * totalDays) + " words in " + totalDays + " days."); // eslint-disable-line no-console