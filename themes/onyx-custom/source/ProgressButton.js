enyo.kind({
	name: "onyx-custom.ProgressButton",
	kind: "onyx-custom.ProgressBar",
	classes: "onyx-custom-progress-button",
	events: {
		onAnimateFinish: "",
		onCancel: "" //* Sent when cancel button is clicked.
	},
	components: [
		{kind: "Animator", onStep: "stepAnimation", onEnd: "animatorComplete"},
		{name: "bar", classes: "onyx-custom-progress-button-inner", style: "z-index:1;"}
	],
	create: function() {
		this.inherited(arguments);
	}
});
