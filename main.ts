import mysql = require('mysql');
import http = require('http');
import { defaultHandler } from './controller';
import { postHandler } from './controller';
import { getHandler } from './controller';

const readJsonBody = (req: http.IncomingMessage): Promise<unknown> => {
  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(chunks);
      try {
        resolve(JSON.parse(data.toString()))
      } catch (e) {
        resolve(null);
      }
    })
  });

}

const server = http.createServer(async (req, res) => {

  const reqURL = req.url;
  const reqMethod = req.method;

  if (reqURL === '/user') {
    if (req.method === 'POST') {
      const data = await readJsonBody(req) as {
        username: string,
        password: string,
      };
      con.query(`
      INSERT INTO user (username, password) 
      VALUES ('${data.username}', '${data.password}')
      `, (err, result) => {
        console.log(err);
        if (err) {
          res.writeHead(500);
          res.end();
          return;
        }
        res.writeHead(200);
        res.end();
      });
      return;
    }
  }

  switch (reqMethod) {
    case "POST": {
      if (reqURL === "/post-api") {
        postHandler(req, res);
      
      break;
      }
    }
      case "GET": {
        if (reqURL === "/get-api") {
          getHandler(req,res);    
        break;
      }
    }
    default: {
      defaultHandler(req, res)
    }
  }
});

server.listen(3000, '0.0.0.0');


const con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: "demo",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select * from user ", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
});


