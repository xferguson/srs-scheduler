/* eslint-env node */
const Card = require("./card.js");

const intervalModes = {
    Memrise: [1, 1, 6, 12, 24, 48, 96, 180],
    ClozeMaster: [1, 10, 30, 180],
    Anki: []
};

const getLearningDays = (totalDays, daysPerWeek) => {
  return [...Array(totalDays).keys()].filter((day) => {
    const dayOfWeek = day % 7;
    const activeWeekdays = [...Array(daysPerWeek).keys()];
    return activeWeekdays.includes(dayOfWeek);
  });
};

const getReviewSchedule = ({
  batchSize = 20, 
  totalDays = 90, 
  errorRate = 0, 
  intervalMode = "Memrise",
  learningDaysPerWeek = 7}) => {
    if (!intervalModes.hasOwnProperty(intervalMode)) {
      const validValues = Object.keys(intervalModes);
      throw new Error(`Invalid interval mode: ${intervalMode}. Valid values: ${validValues}`);
    }

    const learningDays = getLearningDays(totalDays, learningDaysPerWeek);

    const intervals = intervalModes[intervalMode];
    let reviewsByDay = [0];
    if (intervals) {
        let dailyCards = [];

        for (let i = 0; i < totalDays; i++) {
            reviewsByDay[i] = 0;
            
            if (learningDays.includes(i)) {
              for (let j = 0; j < batchSize; j++) {
                  dailyCards.push(new Card(intervals));
              }
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

const getResultString = (batchSize, totalDays, learningDays) => `At this rate you will learn ${batchSize * learningDays} new cards in ${totalDays} day${totalDays === 1 ? "" : "s"}.`;

const getMaxReviewString = (maxReviews, errorRate) =>`Your busiest review day will contain ${maxReviews} card${maxReviews === 1 ? "" : "s"}.${errorRate > 0 ? " (approximation)" : ""}`;

module.exports = {
    intervalModes,
    getLearningDays,
    getReviewSchedule,
    getResultString,
    getMaxReviewString
};