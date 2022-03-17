const express = require("express");
const app = express();
const path = require("path");
const { syncAndSeed } = require("./db");
const router = require("./manufacturers.routes");

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/manufacturers", router);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
