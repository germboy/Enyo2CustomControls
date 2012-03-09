enyo.kind({
	name: "App",
	classes: "onyx",
	components: [
		{style: "padding: 10px;", components: [
		
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "Header"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "This is an input control"}
				]},
				
				{kind: "onyx-custom.TextareaDecorator", components: [
					{
						kind: "onyx-custom.Textarea", 
						name: "myTextarea", 
						placeholder: "Enter text here", 
						rows: "10", 
						content: "This is a textarea control", 
						style:"width:100%"
					}
				]},
				
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "This is an input control"}
				]}
			]},
			{tag: "br"},
			
			
			
			{kind: "onyx.Button", content: "getValue", onclick: "getValue"}, {name: "textValue", style: "display:inline;"},
			{tag: "br"},
			{kind: "onyx.Button", content: "setValue", onclick: "setValue"}, {kind: "onyx.Input", name: "newTextValue", value: "This is new content"},
			{tag: "br"}, {tag: "br"},
			
			{kind: "onyx.Button", content: "getRows", onclick: "getRows"}, {name: "rowsValue", style: "display:inline;"},
			{tag: "br"},
			{kind: "onyx.Button", content: "setRows", onclick: "setRows"}, {kind: "onyx.Input", name: "newRowsValue", value: "12"},
			{tag: "br"}, {tag: "br"},
			
			{kind: "onyx.Button", content: "clear", onclick: "clear"},
			{kind: "onyx.Button", content: "focus", onclick: "focus"}
			
			
		]}
			
		
	],
	
	getValue: function() {
		this.$.textValue.setProperty( "content", this.$.myTextarea.getContent() );
	},
	setValue: function() {
		this.$.myTextarea.setContent( this.$.newTextValue.getValue() );
	},
	
	
	getRows: function() {
		//console.log( this.$.myTextarea.getRows() );
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
	}
	
});
