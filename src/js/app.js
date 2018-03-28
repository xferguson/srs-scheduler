/* eslint-env node */
/* global console */
const Review = require("./review.js");

let studySession,
    batch = 20,
    totalDays = 20;
    // studySessionReviews;

studySession = new Review();
// studySessionReviews = studySession.getReviewSchedule(batch, totalDays);
studySession.getReviewSchedule(batch, totalDays);
// console.log("At this rate you will learn " + (batch * totalDays) + " words in " + totalDays + " days.");