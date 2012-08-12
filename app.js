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
    var data = fetch(signature);
    socket.emit(e, data);            
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
        read(socket, data.signature);
    });  
    socket.on('update', function (data) {
        update(socket, data.signature);       
    }); 
    socket.on('delete', function (data) {
        destroy(socket, data.signature);       
    });                
});


var fetch = function(signature) {
    var data = [];
    switch(signature.endPoint) {
    case "/topics":

        var data = [
            {id: 1111772, title: "My 1st Topic", timestamp: new Date().getTime()},
            {id: 3434, title: "My 2nd Topic", timestamp: new Date().getTime()},
            {id: 5345, title: "My 3rd Topic", timestamp: new Date().getTime()},
            {id: 78678, title: "My 4th Topic", timestamp: new Date().getTime()},
            {id: 3544, title: "My 5th Topic", timestamp: new Date().getTime()},
            {id: 45345, title: "My 6th Topic", timestamp: new Date().getTime()},
            {id: 43, title: "My 7th Topic", timestamp: new Date().getTime()},
            {id: 345345, title: "My 8th Topic", timestamp: new Date().getTime()},
        ];

        return data;
        break;
    }
}