ig.module( 
	'game.entities.ball'
	)
.requires(
	'impact.entity'
	)
.defines(function(){

	EntityBall = ig.Entity.extend({

		collides: ig.Entity.COLLIDES.NEVER,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.BOTH,

		size: {x: 32, y: 32},

		speed: 500,
		lifetime: 0,

		maxVel: {x:500, y:500},

	    // Load an animation sheet
	    animSheet: new ig.AnimationSheet( 'media/balls.png', 32, 32 ),
	    timer: new ig.Timer(),

	    init: function( x, y, settings ) {
	    	this.parent( x, y, settings );

	    	this.addAnim( 'idle', 0.1, [84, 85, 86, 87, 88, 89] );

	    	if(settings.moveHor == 'right')
		    	this.vel.x = this.speed;
	    	if(settings.moveHor == 'left')
		    	this.vel.x = -this.speed;
	    	if(settings.moveVer == 'up')
		    	this.vel.y = -this.speed;
	    	if(settings.moveVer == 'down')
		    	this.vel.y = this.speed;

	    	this.currentAnim = this.anims.idle;

	    	this.timer.set(0.5);
	    },

	    handleMovementTrace: function( res ) {
		    if( res.collision.x || res.collision.y ) {
		    	this.kill();
		    }

		    // Continue resolving the collision as normal
		    this.parent(res); 
		},

	    update: function() {
	    	// if(this.lifetime <=20){this.lifetime +=1;}else{this.kill();}
	    	if(this.timer.delta()>=0){this.kill();};
	    	this.parent();
	    }

	});

});