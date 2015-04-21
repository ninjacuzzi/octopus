ig.module( 
	'game.main' 
	)
.requires(
	'game.entities.player',
	'game.entities.opponent',
	'game.entities.ball',
	'game.entities.void',
	'game.levels.1',
	'game.levels.2',
	'impact.game',
	'impact.font',
    'game.entities.textbox'
	)
.defines(function(){

	MyGame = ig.Game.extend({

		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),


		
		
		init: function() {
			// Initialize your game here; bind keys etc.
			this.socket = new io();
			this.socket.connect();

			var a = $.cookie("nickname");
			this.nickname = $.cookie("nickname");

			this.socket.emit('newplayerjoining', {nickname: a});

			// ig.game.spawnEntity('EntityOpponent', 0, 0, {nickname: 'bob'});
			// ig.game.spawnEntity('EntityOpponent', 0, 0, {nickname: 'alice'});

			this.socket.on('opponent', function (data) {
				var nickname = data.nickname;
				//var opponent = ig.game.getEntitiesByType(EntityOpponent)[0];
				var opponent = ig.game.getEntityByName(nickname);
				if(opponent){
					opponent.pos.x = data.x;
					opponent.pos.y = data.y;
				}
			});

			this.socket.on('newplayerjoining', function (data) {
				var settings = {'nickname': data.nickname};
				ig.game.spawnEntity('EntityOpponent', 0, 0, settings);
			});

			this.socket.on('playerisleaving', function (data) {
				var opponent = ig.game.getEntityByName(data);
				opponent.kill();
			});

			$.ajax({
			    url: '/api/players',
			    type: 'GET',
			    success: function(res) {
			    	players = res.players;
			    	var i = players.indexOf(this.nickname);
					if(i != -1) {
						players.splice(i, 1);
					}
			     	var arrayLength = players.length;
					for (var i = 0; i < arrayLength; i++) {
				    	ig.game.spawnEntity('EntityOpponent', 0, 0, {nickname: players[i]});
					}
			    }
			});


			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.SPACE, 'space');

			this.loadLevel(Level2);

			var tb = this.getEntitiesByType(EntityTextbox)[0];
			tb.triggeredBy(null,null);


			this.a = 0;
		},

		update: function() {
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here
			this.a++;

			var player = this.getEntitiesByType(EntityPlayer)[0];
			if(player){
				if(player.vel.x!=0 || player.vel.y!=0)
					this.socket.emit('position', {nickname:this.nickname, x:player.pos.x, y:player.pos.y});
				this.screen.x = player.pos.x - ig.system.width/2;
				this.screen.y = player.pos.y - ig.system.height/2;
			}
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			
			// Add your own drawing code here
			var x = ig.system.width/2,
			y = ig.system.height/2;
			
			// this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
		}
	});


	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

});
