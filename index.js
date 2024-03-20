const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello User!");
});

app.listen(5173, () => {
  console.log("Listening to app on http://localhost:5173");
});
