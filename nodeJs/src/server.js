var express = require('express');
const { emit, disconnect } = require('process');
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

const meetingRooms = "meetingRooms"
io.on("connection", (socket) => {
    socket.on("join", ({room, seat, nickname}) => {
        if(!room) return;
        if(!Object.keys(socket).includes(meetingRooms)) socket[meetingRooms] = new Object();
        socket.meetingRooms[room] = socket.meetingRooms[room] ? ++socket.meetingRooms[room]: 1;
        socket.join(room); 
        if(seat) socket.to(room).emit("join", {room, seat, nickname});
        // console.log("입장 ", nickname, " ", room, " ", seat);
    });
    socket.on("exist", ({room, seat, nickname}) => { socket.to(room).emit("exist", {room, seat, nickname}); }); // nickname은 new joiner꺼
    socket.on("leave", ({room, nickname, seat}) => {
        if(!room) return;
        if(seat) socket.to(room).emit("leave", {seat});
        if(socket.meetingRooms[room] && --socket.meetingRooms[room] <= 0)
        {
            delete socket.meetingRooms.room;
            socket.leave(room);
        }
        // console.log("퇴장 ", nickname, " ", room, " ", seat);
    });
    socket.on("stream", ({room, byteData}) => { socket.to(room).emit("stream", {room, byteData}); });
    socket.on("finishStream", ({room, state}) => { socket.to(room).emit("finishStream", {room, state}); });
    socket.on("cam", ({room, seat, byteData}) => { socket.to(room).emit("cam", {seat, byteData}); });
    socket.on("finishCam", ({room, seat}) => { socket.to(room).emit("finishCam", {room, seat}); });
    socket.on("mic", ({room, seat, byteData}) => { socket.to(room).emit("mic", {seat, byteData}); });
    socket.on("msg", ({msg, room, nickname}) => { socket.to(room).emit("msg", {msg, nickname}); });

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
    // socket.on("disconnect", (reason)=>{console.log(reason);})
});

http.listen(3000, function(){ console.log('listening on *:3000');});