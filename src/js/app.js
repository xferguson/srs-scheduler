const Review = require("./review.js");

let studySession,
    studySessionReviews;

studySession = new Review();
studySessionReviews = studySession.getReviewSchedule(batch, totalDays);
console.log("At this rate you will learn " + (batch * totalDays) + " words in " + totalDays + " days.");