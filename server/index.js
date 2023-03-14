import Debug from "debug";
import app from "./app";
import mongoose from "mongoose";
import { mongoUrl } from "./config";
import { createServer } from "http";
import socketIO from "socket.io";

const PORT = 3500, //process.env.port ||
  debug = Debug("condor-backend:root"),
  server = createServer(app),
  io = socketIO(server);

// console.log(path.join(__dirname, '../../angular-condor/dist/index.html'))

app.set("io", io);

async function start() {
  await mongoose.connect(mongoUrl, {
    authSource: "db-condor",
  });

  // app.use( publicDir )

  server.listen(PORT, () => {
    debug(`Server running at port ${PORT}`);
  });

  io.on("connection", function (socket) {
    socket.broadcast.emit("msg", { msg: "Welcome bro!" });
    console.log("cliente conectado");
    socket.on("msg", function (msg) {
      console.log(msg);
      socket.broadcast.emit("msg", { msg: "Tu Mensaje: " + msg });
    });
  });
}

start();
