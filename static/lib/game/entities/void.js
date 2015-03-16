ig.module(
	'game.entities.void'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
	EntityVoid = ig.Entity.extend({
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 28, 0, 0.7)',
		_wmScalable: true,
		size: {x: 8, y: 8},
			    check: function( other ) {
		    console.log(other);
		    // ... etc
		},

		update: function(){}
	});
});