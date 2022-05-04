import express from "express";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  socket.on("nickname", ({nickname}) => { socket["nickname"] = nickname; });
  socket.on("join", ({room}) => { socket.join(room); });
  socket.on("chat", ({msg, room}) => { socket.to(room).emit("chat", msg, socket.nickname, room); });
  socket.on("video", ({video, room}) => { socket.to(room).emit("video", video, socket.nickname, room); });
  socket.on("RPC", ({room, variables, func}) => { socket.to(room).emit("RPC", variables, func); });
  socket.on("putLocation", ({url, token, vector}) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer "+ token,
      },
      body: JSON.stringify({
        location : vector
      }),
    });
  });
});

httpServer.listen(3000);