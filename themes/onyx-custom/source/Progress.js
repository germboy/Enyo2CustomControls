enyo.kind({
	name: "onyx-custom.Progress",
	kind: "enyo.Control",
	published: {
		/** The maximum value of the range. */
		maximum: 100,
		/** The minimum value of the range. */
		minimum: 0,
		/** The current progress. */
		position: 0,
		/** The position will be rounded to a multiple of this property. */
		snap: 1
	},
	lastPosition: -1,
	statified: {
		lastPosition: 0
	},
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.positionChanged();
	},
	positionChanged: function(inOldPosition) {
		this.position = this.calcNormalizedPosition(this.position);
		
		if (this.lastPosition != this.position) {
			this.applyPosition();
			this.lastPosition = this.position;
		}
	},
	applyPosition: function() {
	},
	calcNormalizedPosition: function(inPosition) {
		inPosition = Math.max(this.minimum, Math.min(this.maximum, inPosition));
		return Math.round(inPosition / this.snap) * this.snap;
	},
	calcRange: function() {
		return this.maximum - this.minimum;
	},
	calcPercent: function(inPosition) {
		return Math.round(100 * (inPosition - this.minimum) / this.calcRange());
	},
	calcPositionByPercent: function(inPercent) {
		return (inPercent/100) * this.calcRange() + this.minimum;
	}
});
