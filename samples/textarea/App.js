enyo.kind({
	name: "App",
	components: [
		{
			kind: "custom.Textarea", 
			name: "myTextarea", 
			placeholder: "Enter text here", //optional
			rows: "10", //optional
			cols: "45", //optional
			content: "This is a textarea control", //optional
			autofocus: false, //optional
			disabled: false, //optional
			form: "", //optional
			maxlength: "65", //optional
			wrap: "soft", //optional
			onInputChange: "inputChange",
			onDisabledChange: "disabledChange",
			onfocus: "focusChange",
			onblur: "blurChange"
		},
		{tag: "br"},{tag: "br"},
		
		{content: "Event status: ", style: "display:inline;"}, {name: "eventStatus", style: "display:inline;"},
		{tag: "br"},{tag: "br"},
		
		{kind: "enyo.Button", content: "getValue", onclick: "getContent"}, {name: "textValue", style: "display:inline;"},
		{tag: "br"},
		{kind: "enyo.Button", content: "setValue", onclick: "setContent"}, {kind: "enyo.Input", name: "newTextValue", value: "This is new content"},
		{tag: "br"}, {tag: "br"},
		
		{kind: "enyo.Button", content: "getCols", onclick: "getCols"}, {name: "colsValue", style: "display:inline;"},
		{tag: "br"},
		{kind: "enyo.Button", content: "setCols", onclick: "setCols"}, {kind: "enyo.Input", name: "newColsValue", value: "50"},
		{tag: "br"}, {tag: "br"},
		
		{kind: "enyo.Button", content: "getRows", onclick: "getRows"}, {name: "rowsValue", style: "display:inline;"},
		{tag: "br"},
		{kind: "enyo.Button", content: "setRows", onclick: "setRows"}, {kind: "enyo.Input", name: "newRowsValue", value: "15"},
		{tag: "br"}, {tag: "br"},
		
		{kind: "enyo.Button", content: "clear", onclick: "clear"},
		{kind: "enyo.Button", content: "focus", onclick: "focus"},
		{kind: "enyo.Button", content: "enable/disable", onclick: "toggleDisabled"}
	],
	
	getContent: function() {
		this.$.textValue.setProperty( "content", this.$.myTextarea.getContent() );
	},
	setContent: function() {
		this.$.myTextarea.setContent( this.$.newTextValue.getValue() );
	},
	
	getCols: function() {
		this.$.colsValue.setProperty( "content", this.$.myTextarea.getCols() );
	},
	setCols: function() {
		this.$.myTextarea.setCols( this.$.newColsValue.getValue() );
	},
	
	getRows: function() {
		this.$.rowsValue.setProperty( "content", this.$.myTextarea.getRows() );
	},
	setRows: function() {
		this.$.myTextarea.setRows( this.$.newRowsValue.getValue() );
	},
	
	clear: function() {
		this.$.myTextarea.clear();
	},
	focus: function() {
		this.$.myTextarea.focus();
	},
	
	/**************************************
	Events
	**************************************/
	focusChange: function() {
		this.eventStatus("focus");
	},
	blurChange: function() {
		this.eventStatus("blur");
	},
	inputChange: function() {
		this.eventStatus("input changed");
	},
	toggleDisabled: function() {
		var toggleValue = ( !this.$.myTextarea.getDisabled() ) ? true : false;
		this.$.myTextarea.setDisabled(toggleValue);
	},
	disabledChange: function() {
		var toggleValue = ( !this.$.myTextarea.getDisabled() ) ? "enabled" : "disabled";
		this.eventStatus(toggleValue);
	},
	eventStatus: function(value) {
		if (this.$.eventStatus !== undefined) {
			this.$.eventStatus.setContent( value );
		}
	}
	
});
