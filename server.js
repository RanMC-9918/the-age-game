const express = require("express");
const process = require("process");
const { parse } = require("csv-parse");
const fs = require("fs");
let results = getValues();
console.log(results);

// fs.createReadStream("./students.csv")
//   .pipe(parse({ delimiter: ",", from_line: 1 }))
//   .on("data", (row) => {
//     console.log(row);
//     results.push(row);
//   })
//   .on("error", (error) => {
//     console.error(error.message);
//   })
//   .on("end", () => {
//     console.log("Finished reading CSV file");
//   });

const app = express();

let port = process.env.PORT || 5500;

app.listen(port);
console.log("listening on port " + port);

app.use(express.static("client"));

app.get("/api/:id", function (req, res) {
  console.log("new api call");

  let studentNum = req.params.id;
  res.send(results[studentNum][2] + "\n" + results[studentNum][1]);
});

app.get("/images/:id", (req, res) => {
  console.log("new image call: " + req.params.id);
  res.sendFile(`images/${req.params.id}.jpg`, { root: __dirname });
});

app.get("/game", (req, res) => {
  express.static("client\\game");
});

//google API====================================================================================

async function getValues() {
  const { google } = require("googleapis");

  const auth = await new google.auth.GoogleAuth({
    keyFile: "secrets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });

  const client = await auth.getClient();
  const service = google.sheets({ version: "v4", auth: client });

  let spreadsheetId = "1VP6qbS5aN7p9ffNe3-yUo2puLxeFXA1rMKXKtIq8cX0";
  let range = "Sheet1!A1:C20";

  let response = await service.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });

  console.log(response.data.values);
  results = response.data.values;
  return response.data.values;
}
