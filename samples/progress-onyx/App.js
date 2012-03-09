enyo.kind({
	name: "App",
	classes: "onyx",
	published: {
		progressControlProgressing: false
	},
	components: [
		{style: "padding: 10px;", components: [
			
			// Progress Control
			{classes: "divider", content: "Progress"},
			{kind: "onyx-custom.Progress", name: "progressControl", minimum: 30, maximum: 100, position: 70},
			{classes: "onyx-toolbar-inline", components: [
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", name: "inputMin", placeholder: "Integer", value:"30", style:"width:60px;"},
					{content: "MIN", style:"font-weight:bold;font-size:14px;color:#35A8EE;"}
				]},
				{content: "-"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", name: "inputMax", placeholder: "Integer", value:"100", style:"width:60px;"},
					{content: "MAX", style:"font-weight:bold;font-size:14px;color:#35A8EE;"}
				]},
				{content: "&nbsp;&nbsp;"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", name: "inputStart", placeholder: "Integer", value:"70", style:"width:60px;"},
					{content: "START", style:"font-weight:bold;font-size:14px;color:#35A8EE;"}
				]},
				{kind: "onyx.Button", name: "progressControlToggle", content: "Toggle Progress", onclick: "progressControlToggle", style: "height: 45px;"}
			]},
			{name: "progressResults", content: "Position: "}
			
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	
	
	/****************************************************
	Progress Control Functions
	****************************************************/
	progressControlToggleState: function(button, flag) {
		flag ? button.addClass("active") : button.removeClass("active");
		
		this.progressControlProgressing = flag;
		this.$.inputMin.setDisabled(flag);
		this.$.inputMax.setDisabled(flag);
		this.$.inputStart.setDisabled(flag);
		
	},
	progressControlToggle: function(inSender) {
		if (this.progressControlProgressing) {
			this.progressControlToggleState(inSender, false);
		} else {
			var p = this.$.progressControl;
			p.setMinimum( parseInt(this.$.inputMin.getValue()) );
			p.setMaximum( parseInt(this.$.inputMax.getValue()) );
			p.setPosition( parseInt(this.$.inputStart.getValue()) );
			
			this.progressControlToggleState(inSender, true);
		}
		
		this.progressControlNextProgress();
	},
	progressControlNextProgress: function() {
		if (this.progressControlProgressing) {
			// animate only if node is showing
			enyo.requestAnimationFrame(enyo.bind(this, "progressControlNextStep"), this.hasNode());
		}
	},
	progressControlNextStep: function() {
		var p = this.$.progressControl;
		var pos = this.progressControlIncrement();
		
		pos >= p.maximum ? this.progressControlToggleState(this.$.progressControlToggle, false) : setTimeout(enyo.bind(this, "progressControlNextProgress"), 500);
		
	},
	progressControlIncrement: function() {
		var p = this.$.progressControl;
		var i = p.minimum + ((p.position - p.minimum + 5) % (p.calcRange() + 1));
		p.setPosition(i);
		this.$.progressResults.setContent("Position: " + i);
		
		return i;
	}
	
});
