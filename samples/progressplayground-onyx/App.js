enyo.kind({
	name: "App",
	classes: "onyx",
	published: {
		progressButtonProgressing: false,
		progressControlProgressing: false
	},
	components: [
		
		{kind: "enyo.Scroller", components: [
			{style: "padding: 10px;", components: [
				
			
				// ProgressButton Control
				{classes: "divider", content: "ProgressButton"},
				{kind: "onyx-custom.ProgressButton", name: "progressButtonControl", position: 50, min: 0, style:"height:42px;", onCancel:"reset", components: [
					{kind: "FittableColumns", style:"height:100%;z-index:10;position:relative;", components: [
						{content: "0", classes: "onyx-custom-box"},
						{fit: true},
						{content: "100", classes: "onyx-custom-box"}
					]}
				]},
				{kind: "onyx.Button", content: "Toggle Progress", onclick: "progressButtonToggle", style:"width:100%;margin-top:2px;"},
				{tag: "br"},{tag: "br"},
				
				
				// ProgressBar Control
				{classes: "divider", content: "ProgressBar"},
				{kind: "onyx-custom.ProgressBar", name: "progressBarControl"},
				{classes: "tools", defaultKind: "onyx.Button", components: [
					{kind: "onyx.InputDecorator", components: [
						{kind: "onyx.Input", name: "inputPosition", placeholder: "Enter 1-100", value:"50", style:"width:100px;", attributes:{"maxlength": 3}}
					]},
					{content: "Set Position", onclick: "setProgressBarPosition", style: "height: 45px;"},
					{kind: "onyx.ToggleButton", name: "animateFlag", value: true},
					{kind: "enyo.Control", content: "Animate", style: "padding-left:4px;display:inline;"}
				]},
				{tag: "br"},{tag: "br"},
				
				
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
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	
	
	/****************************************************
	ProgressButton Control Functions
	****************************************************/
	progressButtonToggleState: function(button, flag) {
		flag ? button.addClass("active") : button.removeClass("active");
		this.progressButtonProgressing = flag;
	},
	progressButtonToggle: function(inSender) {
		if (this.progressButtonProgressing) {
			this.progressButtonToggleState(inSender, false);
		} else {
			this.progressButtonToggleState(inSender, true);
		}
		
		this.progressButtonNextProgress();
	},
	progressButtonNextProgress: function() {
		if (this.progressButtonProgressing) {
			// animate only if node is showing
			enyo.requestAnimationFrame(enyo.bind(this, "progressButtonNextStep"), this.hasNode());
		}
	},
	progressButtonNextStep: function() {
		this.progressButtonIncrement();
		setTimeout(enyo.bind(this, "progressButtonNextProgress"), 500);
	},
	progressButtonIncrement: function() {
		var p = this.$.progressButtonControl;
		var i = p.minimum + ((p.position - p.minimum + 5) % (p.calcRange() + 1));
		p.setPosition(i);
	},
	reset: function() {
		this.$.progressButtonControl.setPosition(0);
	},
	
	/****************************************************
	ProgressBar Control Functions
	****************************************************/
	setProgressBarPosition: function() {
		var pos = this.$.inputPosition.getValue();
		this.$.animateFlag.getValue() ? this.$.progressBarControl.setPosition(pos) : this.$.progressBarControl.setPositionImmediate(pos);
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
