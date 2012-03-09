enyo.kind({
	name: "custom.Textarea",
	published: {
		autofocus: false,
		cols: "",
		content: "",
		disabled: false,
		form: "",
		maxlength: "",
		placeholder: "",
		rows: "",
		wrap: "soft"
	},
	events: {
		onInputChange: "",
		onDisabledChange: ""
	},
	tag: "textarea",
	classes: "enyo-textarea",
	style: "resize:none;",
	attributes: {
		onfocus: enyo.bubbler,
		onblur: enyo.bubbler
	},
	handlers: {
		oninput: "input",
		onclear: "clear"
	},
	create: function() {
		// hack sniff
		if (navigator.userAgent.match("MSIE")) {
			this.handlers.onkeyup = "keyup";
		}
		this.inherited(arguments);
		
		this.disabledChanged();
		this.placeholderChanged();
		this.valueChanged();
		
		this.setAttribs();
	},
	setAttribs: function() {
		this.setAttribute("autofocus", this.autofocus);
		this.setAttribute("cols", this.cols);
		this.setAttribute("form", this.form);
		this.setAttribute("maxlength", this.maxlength);
		this.setAttribute("rows", this.rows);
		this.setAttribute("wrap", this.wrap);
	},
	placeholderChanged: function() {
		this.setAttribute("placeholder", this.placeholder);
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
		this.bubble("onDisabledChange");
	},
	valueChanged: function() {
		this.setNodeProperty("value", this.content);
		this.notifyContainer();
	},
	keyup: function() {
		this.notifyContainer();
	},
	input: function() {
		this.notifyContainer();
	},
	notifyContainer: function() {
		this.bubble("onInputChange");
	},
	
	clear: function() {
		this.setContent("");
	},
	focus: function() {
		if (this.hasNode()) {
			this.node.focus();
		}
	},
	getContent: function() {
		return this.getNodeProperty("value", this.value);
	},
	setContent: function(inValue) {
		this.setPropertyValue("content", inValue, "valueChanged");
	},
	
	getCols: function() {
		return this.getNodeProperty("cols");
	},
	setCols: function(inValue) {
		this.setAttribute("cols", inValue);
	},
	
	getRows: function() {
		return this.getNodeProperty("rows");
	},
	setRows: function(inValue) {
		this.setAttribute("rows", inValue);
	},
	
	getWrap: function() {
		return this.getNodeProperty("wrap");
	},
	setWrap: function(inValue) {
		this.setAttribute("wrap", inValue);
	}
});
