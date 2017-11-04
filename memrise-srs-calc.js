// This is designed to calculate your SRS schedule based off of the Memrise algorithm: 1, 1, 6, 12, 24, 48, 96, 180, 180, etc

var myArgs = process.argv.splice(2),
	batch = parseInt(myArgs[0]),
	totalDays = parseInt(myArgs[1]),
	studySession,
	studySessionReviews;

class Review {
	constructor() {
		this.intervals = [1, 1, 6, 12, 24, 48, 96, 180];
	}

	getReviewSchedule(batchSize, days) {

		var intervals = this.intervals;
		var days = days;
		var dailyBatches = [];
		var reviewsByDay = [0];
		
		class Batch {
			constructor(batchSize) {
				this.batchSize = batchSize;
				this.intervals = intervals;
				this.interval = 0;
				this.daysUntilReview = intervals[0];
			}

			reviewsToday() {
				if (this.daysUntilReview === 0) {
					// console.log("batch size: " + this.batchSize);
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

		for (var i = 0; i < days; i++) {
			// console.log('Day: ' + i);
			dailyBatches.push(new Batch(batchSize));
			for (var d = 0; d < dailyBatches.length; d++) {
				// console.log('reviewsByDay[i]: ' + reviewsByDay[i]);
				// console.log('dailyBatches[d]: ' + dailyBatches[d].reviewsToday());
				reviewsByDay[i] = reviewsByDay[i] ? reviewsByDay[i] + dailyBatches[d].reviewsToday() : 0 + dailyBatches[d].reviewsToday();
				// console.log('new reviewsByDay[i]: ' + reviewsByDay[i]);
				dailyBatches[d].advanceInterval();
			}
			console.log('Day ' + (i + 1) + ': Reviews = ' + reviewsByDay[i] + ', New = ' + batchSize);
		}

		return reviewsByDay;
	}

}

studySession = new Review();
studySessionReviews = studySession.getReviewSchedule(batch, totalDays);
console.log('At this rate you will learn ' + (batch * totalDays) + ' words in ' + totalDays + ' days.');
