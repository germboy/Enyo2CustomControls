enyo.kind({
	name: "onyx-custom.ProgressBar",
	kind: "onyx-custom.Progress",
	classes: "onyx-custom-progress-bar",
	published: {
		/** Controls whether progress changes are animated. */
		animatePosition: true
	},
	events: {
		onBeginAnimation: "",
		onEndAnimation: ""
	},
	
	components: [
		{kind: "Animator", onStep: "stepAnimation", onEnd: "animatorComplete"},
		{name: "bar", classes: "onyx-custom-progress-bar-inner"},
		{name: "client"}
	],
	
	create: function() {
		this.inherited(arguments);
	},
	contentChanged: function() {
		this.$.client.setContent(this.content);
	},
	//* @public
	/**
	Set position immediately to the given position, bypassing animation.
	*/
	setPositionImmediate: function(inPosition) {
		
		var ap = this.animatePosition;
		this.animatePosition = false;
		this.setPosition(inPosition);
		this.animatePosition = ap;
	},
	//* @protected
	setPosition: function(inPosition) {
		// complete any animation before next change.
		this.$.animator.stop();
		var l = this.position;
		this.position = inPosition;
		this.positionChanged(l);
	},
	applyPosition: function() {
		var p = this.calcPercent(this.position);
		
		if ((this.lastPosition >= 0) && this.animatePosition /*&& !this.$.animator.isAnimating()*/ && this.canAnimate()) {
			
			this.$.animator.play({
				startValue: this.calcPercent(this.lastPosition),
				endValue: p,
				node: this.hasNode()
			});
			
		} else {
			this.renderPosition(p);
		}
	},
	renderPosition: function(inPercent) {
		this.$.bar.applyStyle("visibility", inPercent <= 0 ? "hidden" : "visible");
		this.$.bar.applyStyle("width",  inPercent + "%");
	},
	renderPositionDirect: function(inDomStyle, inPercent) {
		inDomStyle.visibility = inPercent <= 0 ? "hidden" : "visible";
		inDomStyle.width = inPercent + "%";
	},
	canAnimate: function() {
		return this.$.bar.hasNode();
	},
	beginAnimation: function(inSender, inStart, inEnd) {
		this.$.bar.domStyles.visibility = inEnd <= 0 ? "hidden" : "visible";
		this.$.bar.domStyles.width = inEnd + "%";
		if (this.$.bar.hasNode()) {
			inSender.setNode(this.$.bar.node);
			inSender.style = this.$.bar.node.style;
			this.doBeginAnimation();
		}
	},
	stepAnimation: function(inSender, inValue) {
		this.renderPosition(inValue.originator.value);
	},
	endAnimation: function(inSender, inValue) {
		this.completeAnimation(inSender, inValue);
	},
	stopAnimation: function(inSender, inValue, inStart, inEnd) {
		inSender.setNode(null);
		this.completeAnimation(inSender, inEnd);
	},
	completeAnimation: function(inSender, inValue) {
		this.renderPositionDirect(inSender.style, inValue);
		this.doEndAnimation();
	},
	forceBeginAnimation: function(inStart, inEnd) {
		this.beginAnimation(this.$.animator, inStart, inEnd);
	},
	forceStepAnimation: function(inValue) {
		this.stepAnimation(this.$.animator, inValue);
	},
	forceCompleteAnimation: function(inValue) {
		this.completeAnimation(this.$.animator, inValue);
	}
});
