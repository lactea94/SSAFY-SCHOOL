var express = require('express');
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
  socket.on("nickname", ({DataString, DataByte}) => { socket["nickname"] = DataString; console.log(DataString)});
  socket.on("join", ({DataString, DataByte}) => { socket.join(DataString); });
  socket.on("video", ({DataString, DataByte}) => { socket.to(DataString).emit("video", {DataString: socket.nickname, DataByte});});

  // socket.on("RPC", ({room, variables, func}) => { socket.to(room).emit("RPC", {variables, func}); });
  // socket.on("putLocation", ({url, token, vector}) => {
  //   fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Authorization": "Bearer "+ token,
  //     },
  //     body: JSON.stringify({ location : vector }),
  //   });
  // });
});

http.listen(3000, function(){ console.log('listening on *:3000');});