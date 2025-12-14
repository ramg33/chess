const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../front")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/views/index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/views/login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/views/register.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
