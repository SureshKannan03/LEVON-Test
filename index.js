const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("io", io);

// Connect Database
connectDB();

app.use(bodyParser.json());
app.use(express.json({ extended: false }));

app.use("/api", require("./routes/userRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/profile", require("./routes/authRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/notify", require("./routes/notificationRoutes"));

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
