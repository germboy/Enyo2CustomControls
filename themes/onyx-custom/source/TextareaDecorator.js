enyo.kind({
	name: "onyx-custom.TextareaDecorator",
	kind: "enyo.ToolDecorator",
	published: {
		disabled: false
	},
	tag: "label",
	classes: "onyx-custom-textarea-decorator",
	handlers: {
		onDisabledChange: "disabledChange",
		onfocus: "receiveFocus",
		onblur: "receiveBlur"
	},
	receiveFocus: function() {
		this.addClass("onyx-custom-focused");
	},
	receiveBlur: function() {
		this.removeClass("onyx-custom-focused");
	},
	disabledChange: function(inSender, inEvent) {
		this.addRemoveClass("onyx-custom-disabled", inEvent.originator.disabled);
	}
});