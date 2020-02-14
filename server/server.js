const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

// console.log(path.join(__dirname, "/.../public"));
const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 8888;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
var jumlahKonekServer = 0;
app.use(express.static(publicPath));

io.on("connection", socket => {
  jumlahKonekServer++;
  io.sockets.emit("jumlahKonekServer", {
    jumlahKonekServer: jumlahKonekServer
  });
  console.log("koneksi berjalan");
  socket.on("disconnect", () => {
    jumlahKonekServer--;
    io.sockets.emit("jumlahKonekServer", {
      jumlahKonekServer: jumlahKonekServer
    });
    console.log("koneksi berhenti");
  });
});

server.listen(port, () => {
  console.log(`Berjalan di port ${port}`);
});
