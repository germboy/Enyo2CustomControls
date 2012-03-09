enyo.kind({
	name: "App",
	classes: "onyx",
	published: {
		progressButtonProgressing: false
	},
	components: [
		{style: "padding: 10px;", components: [
			
			// ProgressButton Control
			{classes: "divider", content: "ProgressButton"},
			{kind: "onyx-custom.ProgressButton", name: "progressButtonControl", position: 50, min: 0, style:"height:42px;", components: [
				{kind: "FittableColumns", style:"height:100%;z-index:10;position:relative;", components: [
					{content: "0", classes: "onyx-custom-box"},
					{fit: true},
					{content: "100", classes: "onyx-custom-box"}
				]}
			]},
			{kind: "onyx.Button", content: "Toggle Progress", onclick: "progressButtonToggle", style:"width:100%;margin-top:2px;"},
			{tag: "br"},{tag: "br"},
			
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
	}
	
});
