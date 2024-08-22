const express = require("express");
const { parse } = require("csv-parse");
const fs = require("fs");
let results = [];

fs.createReadStream("./students.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", (row) => {
    console.log(row);
    results.push(row);
  })
  .on("error", (error) => {
    console.error(error.message);
  })
  .on("end", () => {
    console.log("Finished reading CSV file");
  });

const app = express();

const port = process.env.PORT || 5500; // set port to either environment variable or 5500 if not set

app.listen(port);
console.log("listening on port " + port);

app.use(express.static("client"));

app.get("/api/:id", function (req, res) {
  console.log("new api call");
  let studentNum = req.params.id;
  res.send(
    results[studentNum][2] + "\n" +
      results[studentNum][1]
  );
});

app.get("/images/:id", (req, res) => {
  console.log("new image call: " + req.params.id);
  res.sendFile(`images/${req.params.id}.jpg`, { root: __dirname });
});

app.get("/game", (req, res) => {
  express.static("client\\game");
});
