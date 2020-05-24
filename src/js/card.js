/* eslint-env node */
class Card {
    constructor(intervals) {
        this.intervals = intervals;
        this.interval = 0;
        this.daysUntilReview = intervals[0];
    }

    reviewToday() {
        return this.daysUntilReview === 0;
    }

    advanceInterval(errorRate) {
        if (this.daysUntilReview > 0) {
            this.daysUntilReview--;
        } else {
            this.interval = Math.random() * 100 < errorRate ? 0 : this.interval + 1;
            if (this.interval < this.intervals.length) {
                this.daysUntilReview = this.intervals[this.interval];
            } else {
                this.daysUntilReview = this.intervals[this.intervals.length - 1];
            }
        }
    }

    resetReviews() {
        this.interval = 0;
        this.daysUntilReview = this.intervals[0];
    }
}

module.exports = Card;