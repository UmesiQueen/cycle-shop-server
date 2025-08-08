const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "https://cycle-shop.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api/products", (req, res) => {
  const jsonPath = "./db.json";

  fs.readFile(jsonPath, "utf8", (err, data) => {
    // Read/modify file data here
    res.send(JSON.parse(data));
    if (err) console.log(err, "err occurred");
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started on", port);
});
