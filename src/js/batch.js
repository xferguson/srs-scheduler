/* eslint-env node */
class Batch {
    constructor(batchSize, intervals) {
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

module.exports = Batch;