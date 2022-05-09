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
  socket.on("join", ({room, seat, nickname}) => { 
    socket.join(room); 
    if(nickname != "") socket["nickname"] = nickname;
    if(seat != "") 
    {
      socket["seat"] = seat;
      socket.to(room).emit("join", {room, seat, nickname});
    }
    // console.log("입장 ", nickname, " ", room, " ", seat)
  });
  socket.on("exist", ({room, seat, nickname}) => { socket.to(room).emit("exist", {seat, nickname}); }); // nickname은 new joiner꺼
  socket.on("leave", ({room, seat, nickname}) => {
    if(seat != "") 
    {
      socket["seat"] = seat;
      socket.to(room).emit("leave", {room, seat, nickname});
    }
    socket.leave(room);
    // console.log("퇴장 ", nickname, " ", room, " ", seat)
  });
  socket.on("msg", ({msg, nickname, room}) => { socket.to(room).emit("msg", {msg, nickname}); });
  socket.on("video", ({room, byteData}) => { socket.to(room).emit("video", {seat: socket.seat, byteData}); });
  socket.on("mic", ({room, byteData}) => { socket.to(room).emit("mic", {seat: socket.seat, byteData}); });

  socket.on("putLocation", ({stringData}) => { // stringData = {url, token, vector}
    fetch(stringData[0], {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer "+ stringData[1],
      },
      body: JSON.stringify({ location : stringData[2] }),
    });//.then((res) =>console.log(res));
  });
});

http.listen(3000, function(){ console.log('listening on *:3000');});