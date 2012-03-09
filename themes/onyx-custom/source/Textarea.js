enyo.kind({
	name: "onyx-custom.Textarea",
	kind: "custom.Textarea",
	events: {
		onDisabledChange: ""
	},
	classes: "onyx-custom-input",
	defaultFocus: false,
	rendered: function() {
		this.inherited(arguments);
		if (this.defaultFocus) {
			this.focus();
		}
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
		this.bubble("onDisabledChange");
	}
});
