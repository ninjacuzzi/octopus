var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var nbofplayers = 0;
var playernames = [];

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(__dirname + '/static'));

var router = express.Router();

router.post('/players', function(req, res) {
	// var nickname = req.body.nickname;
	// var avatar = req.body.avatar;
	// console.log(req.body);
	// res.end(req.body.nickname);
	var nicks = ['bob', 'alice'];
	console.log(nicks);
	res.send(nicks);
});

router.get('/players', function(req, res) {
	res.json({ players: playernames });
});

app.use('/api', router);

io.on('connection', function(socket){
	var myname = "";
	console.log('a user connected');
	socket.on('chat message', function (data) {
		// console.log(data);
		io.emit('news', { hello: 'world' });
	});
	socket.on('position', function (data) {
		socket.broadcast.emit('opponent', data);
	});
	socket.on('newplayerjoining', function (data) {
		console.log(data);
		nbofplayers++;
		playernames.push(data.nickname);
		myname = data.nickname;
		console.log(data.nickname);
		socket.broadcast.emit('newplayerjoining', data);
	});
	socket.on('disconnect', function(){
		var i = playernames.indexOf(myname);
		if(i != -1) {
			playernames.splice(i, 1);
		}
		socket.broadcast.emit('playerisleaving', myname);
		console.log('user disconnected: ' + myname);
		console.log(playernames);

	});
});

http.listen(80, function(){
	console.log('listening on *:80');
});
