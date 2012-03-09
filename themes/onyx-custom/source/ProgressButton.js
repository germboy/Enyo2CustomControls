enyo.kind({
	name: "onyx-custom.ProgressButton",
	kind: "onyx-custom.ProgressBar",
	classes: "onyx-custom-progress-button",
	events: {
		onCancel: "" //* Sent when cancel button is clicked.
	},
	components: [
		{kind: "Animator", onStep: "stepAnimation", onEnd: "animatorComplete"},
		{name: "bar", classes: "onyx-custom-progress-button-inner", style: "z-index:1;"},
		
		{className: "enyo-fit", kind: "FittableColumns", components: [
			{name: "client", fit: true, align:"center", classes: "onyx-custom-progress-button-client"},
			{name: "cancelButton", classes: "onyx-custom-progress-button-cancel", requiresDomMousedown: true, onclick: "doCancel"}
		]}
		
	],
	create: function() {
		this.inherited(arguments);
	}
});
