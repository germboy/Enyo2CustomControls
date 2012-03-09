enyo.kind({
	name: "App",
	classes: "onyx",
	components: [
		{style: "padding: 10px;", components: [
			
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
			]}
			
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	
	/****************************************************
	ProgressBar Control Functions
	****************************************************/
	setProgressBarPosition: function() {
		var pos = this.$.inputPosition.getValue();
		this.$.animateFlag.getValue() ? this.$.progressBarControl.setPosition(pos) : this.$.progressBarControl.setPositionImmediate(pos);
	}
	
});
