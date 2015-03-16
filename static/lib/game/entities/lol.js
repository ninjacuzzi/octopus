ig.module(
	'game.entities.lol'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
	EntityLol = ig.Entity.extend({
    	checkAgainst: ig.Entity.TYPE.BOTH,
   		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 28, 0, 0.7)',
		_wmScalable: true,
		size: {x: 8, y: 8},
		check: function( other ) {
		    // if( other instanceOf EntityPlayer) {
		    	console.log(this.warpzone);
		    	var lev = this.warpzone; 
		    	ig.game.loadLevelDeferred(ig.global['Level'+lev]);
		    // }
    	},

		update: function(){}
	});
});