!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e){t.exports=class{constructor(){this.intervals=[1,1,6,12,24,48,96,180]}getReviewSchedule(t,e){var i=this.intervals,n=(e=e,[]),r=[0];class s{constructor(t){this.batchSize=t,this.intervals=i,this.interval=0,this.daysUntilReview=i[0]}reviewsToday(){return 0===this.daysUntilReview?this.batchSize:0}advanceInterval(){this.daysUntilReview>0?this.daysUntilReview=this.daysUntilReview-1:(this.interval=this.interval+1,this.interval<this.intervals.length?this.daysUntilReview=this.intervals[this.interval]:this.daysUntilReview=this.intervals[this.intervals.length-1])}}for(var a=0;a<e;a++){n.push(new s(t));for(var l=0;l<n.length;l++)r[a]=r[a]?r[a]+n[l].reviewsToday():0+n[l].reviewsToday(),n[l].advanceInterval();console.log("Day "+(a+1)+": Reviews = "+r[a]+", New = "+t)}return r}}},function(t,e,i){let n,r;r=(n=new(i(0))).getReviewSchedule(batch,totalDays),console.log("At this rate you will learn "+batch*totalDays+" words in "+totalDays+" days.")},function(t,e,i){t.exports=i(1)}]);