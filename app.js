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