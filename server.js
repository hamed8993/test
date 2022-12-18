const express = require("express");
const app = express();
app.use(express.static("./front"));
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
    //   origin: ["http://localhost:8000","http://localhost:3000", "http://localhost:8080"],
    origin: ["http://localhost:5000","http://127.0.0.1:8000","https://hamed8993.github.io"],  
    methods: ["GET", "POST"],
      credentials: true,
    //   transports: ['websocket', 'polling'],
    //   allowedHeaders: ["my-custom-header"],
    },
    allowEIO3: true
  });
io.on("connection", client => {
    client.emit("init", { data: "Game Started!"})
    startGameInterval(client);
});
function startGameInterval(client){
  console.log("client.conn.id:", client.conn.id)
      const intervalId = setInterval(() => {
                    client.emit("palse")
               }, 1200)
}
server.listen(5000,()=> console.log("express-app liastening on port 5000"));

