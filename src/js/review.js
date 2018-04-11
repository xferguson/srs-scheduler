/* eslint-env node */
class Review {
    constructor() {
        this.intervalModes = {
            Memrise: [1, 1, 6, 12, 24, 48, 96, 180],
            ClozeMaster: [1, 10, 30, 180],
            Anki: []
        };
    }
    setIntervalMode(mode) {
        if (this.intervalModes.hasOwnProperty(mode)) {
            this.intervals = this.intervalModes[mode];
        } else {
            return false;
        }
    } 

    getReviewSchedule(batchSize, days, mode = "Memrise") {
        const getIntervals = (mode) => {
            if (this.intervalModes.hasOwnProperty(mode)) {
                return this.intervalModes[mode];
            } else {
                return false;
            }
        };
        const intervals = getIntervals(mode);
        if (intervals) {
            let dailyBatches = [];
            let reviewsByDay = [0];

            class Batch {
                constructor(batchSize) {
                    this.batchSize = batchSize;
                    this.intervals = intervals;
                    this.interval = 0;
                    this.daysUntilReview = intervals[0];
                }

                reviewsToday() {
                    if (this.daysUntilReview === 0) {
                        return this.batchSize;
                    } else {
                        return 0;
                    }
                }

                advanceInterval() {
                    if (this.daysUntilReview > 0) {
                        this.daysUntilReview = this.daysUntilReview - 1;
                    } else {
                        this.interval = this.interval + 1;
                        if (this.interval < this.intervals.length) {
                            this.daysUntilReview = this.intervals[this.interval];
                        } else {
                            this.daysUntilReview = this.intervals[this.intervals.length - 1];
                        }
                    }
                }
            }

            for (let i = 0; i < days; i++) {
                dailyBatches.push(new Batch(batchSize));
                for (var d = 0; d < dailyBatches.length; d++) {
                    reviewsByDay[i] = reviewsByDay[i] ? reviewsByDay[i] + dailyBatches[d].reviewsToday() : 0 + dailyBatches[d].reviewsToday();
                    dailyBatches[d].advanceInterval();
                }
            }

            return reviewsByDay;
        } else {
            return false;
        }
    }

}

export default Review;