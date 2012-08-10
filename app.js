var nodeStatic = require('node-static'),
    express = require('express'),
    http = require('http')
    io = require('socket.io');

var webroot = new nodeStatic.Server('./public');

var app = express(),
    server = http.createServer(function(request, response){
              request.addListener('end', function () {
              webroot.serve(request, response);
            });

    },app),

io = io.listen(server);
io.set("log level", 0);
server.listen(4000);




var create = function (socket, signature) {
    var e = event('create', signature), data = [];
    socket.emit(e, {id : 1});            
};
 
var read = function (socket, signature) {
    var e = event('read', signature), data = [];
    for(var i = 0; i < 10; i++) {
        data.push({uuid: i, name:"albert", age: i*78.5})
    }
    socket.emit(e, JSON.stringify(data));            
};
 
var update = function (socket, signature) {
    var e = event('update', signature), data = [];
    socket.emit(e, {success : true});            
};
 
var destroy = function (socket, signature) {
    var e = event('delete', signature), data = [];
    socket.emit(e, {success : true});            
};
 
// creates the event to push to listening clients
var event = function (operation, sig) {
    var e = operation + ':'; 
    e += sig.endPoint;
    if (sig.ctx) e += (':' + sig.ctx);
 
    return e;
};
 
io.sockets.on('connection', function (socket) {
    socket.on('create', function (data) {
        create(socket, data.signature);       
    });      
    socket.on('read', function (data) {
        console.log("read albert");
        read(socket, data.signature);
    });  
    socket.on('update', function (data) {
        update(socket, data.signature);       
    }); 
    socket.on('delete', function (data) {
        destroy(socket, data.signature);       
    });                
});



// SOCKET.IO functions
/*
io.sockets.on('connection', function (socket) {

 var username;

 socket.emit('news', { hello: 'you are now connected' });


  socket.on('connectEvent', function (data) {
    console.log(data);
  });

  // server broadcast
  socket.on('helloeveryone', function (msg) {
    
    if(!username){
        username = msg['broadcastMessage'];
        socket.broadcast.emit('helloeveryone', {broadcastMessage: username + ' connected'});
        socket.emit('helloeveryone',{broadcastMessage: username + ' connected'});
        console.log(username + ' connected');
        return;
    }

    var message = username + ': ' +msg['broadcastMessage'];
    socket.broadcast.emit('helloeveryone', {broadcastMessage: message});
    socket.emit('helloeveryone', {broadcastMessage: message});
    console.log(message);
  });


  // on disconnect
  socket.on('disconnect', function () {
	console.log(username + " disconnected"); 
  });

});
*/