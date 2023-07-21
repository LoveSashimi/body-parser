import express = require("express");
import bodyParser = require("body-parser");
import mysql = require("mysql2");
import fs = require("fs");

const app = express();

const jsonParser = bodyParser.json();

const con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: "demo",
  port: 3306,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select * from user ", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
});

app.use(jsonParser).post("/user", (req, res) => {
  const data = req.body;
  const query = `
  INSERT INTO user (username, password) 
  VALUES (?, ?)
  `;


  
  con.query(query, [data.username, data.password], (err, result) => {
    console.log(err, result);
    if (err) {
      res.writeHead(500);
      res.end();
      return;
    }
    res.writeHead(200);
    res.end();
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
});

app.listen(3000, () => {});
