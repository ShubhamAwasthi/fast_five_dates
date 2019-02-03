var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var users = {};

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('user joins', function(msg){
    io.emit('user joins', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('user left', function(msg){
    io.emit('user left', users[msg.id]);
    console.log('Total users', users.length);
    delete users[msg.id];
  })
	socket.on('chat message', function(msg){
    io.emit('chat message', Object.assign({}, users[msg.id], {message: msg.message}));
  });
  socket.on('preferences', function(msg){
    users[msg.id] = msg;
    io.emit('update user', msg);
  });
});

http.listen(process.env.PORT||3000, function(){
  console.log('listening on *:3000');
});
