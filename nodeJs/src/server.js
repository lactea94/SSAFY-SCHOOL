var express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { stringify } = require('querystring');
var app = express();
app.use(express.static(__dirname + '/public'));

var http = require('http').createServer(app);
// var io = require('socket.io')(http, {allowEIO3: true, allowEIO4: true, serveClient: true});

var io = require('socket.io')(http, {
  allowEIO3: true,
  allowEIO4: true,
  serveClient: true,
  cors: { origin: '*'}
});

io.on("connection", (socket) => {
  socket.on("join", ({room, nickname}) => { 
    socket.join(room); 
    socket["nickname"] = nickname;
  });
  socket.on("leave", ({room}) => { socket.leave(room); });
  socket.on("msg", ({msg, nickname, room}) => { socket.to(room).emit("msg", {msg, nickname}) });
  socket.on("video", ({room, byteData}) => { socket.to(room).emit("video", {nickname: socket.nickname, byteData}); });
  socket.on("mic", ({room, byteData}) => { socket.to(room).emit("mic", {nickname: socket.nickname, byteData}); console.log("hi")});

  socket.on("putLocation", ({stringData}) => { // stringData = {url, token, vector}
    fetch(stringData[0], {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer "+ stringData[1],
      },
      body: JSON.stringify({ location : stringData[2] }),
    });
  });
});

http.listen(3000, function(){ console.log('listening on *:3000');});