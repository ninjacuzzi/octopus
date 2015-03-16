ig.module( 
	'game.entities.opponent'
	)
.requires(
	'impact.entity'
	)
.defines(function(){

	EntityOpponent = ig.Entity.extend({

		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		size: {x: 32, y: 32},
		health: 50,

		speed: 100,
	    // Load an animation sheet
	    animSheet: new ig.AnimationSheet( 'media/monsters.png', 32, 32 ),

	    init: function( x, y, settings ) {
	    	this.parent( x, y, settings );

			this.name = settings.nickname;

			this.addAnim( 'up', 0.21, [7, 8, 9, 8] );
			this.addAnim( 'down', 0.21, [0, 1, 2, 1] );
			this.addAnim( 'left', 0.21, [10, 11, 12, 11] );
			this.addAnim( 'right', 0.21, [4, 5, 6, 5] );

	    	this.currentAnim = this.anims.down;
	    	this.directionHor = 'none';
	    	this.directionVer = 'down';
	    	this.moveHor = 'none';
	    	this.moveVer = 'none';
	    	this.state = 'idle';
	    },

	    update: function() {

	    	this.parent();
	    }

	});

});