import http = require("http");
import qs = require("qs");
import bodyParser = require("body-parser");

export const defaultHandler: http.RequestListener = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application",
  });
  res.write(
    JSON.stringify({
      message: `API not found at ${req.url}`,
    })
  );
  res.end();
};

export const postHandler: http.RequestListener = async (req, res) => {
  const chunks: Uint8Array[] = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", () => {
    const data = Buffer.concat(chunks);
    const query = data.toString();
    console.log({ query });

    const parsedData = new URLSearchParams(query);
    const dataObj: Record<string, string> = {};
    for (var pair of parsedData.entries()) {
      dataObj[pair[0]] = pair[1];
    }
    res.writeHead(200, {
      "Content-Type": "application",
    });
    res.write(
      JSON.stringify({
        message: "POST Successful",
      })
    );
    res.end();
  });
};

export const getHandler: http.RequestListener = (req, res) => {
  const data = {
    name: "tony",
    category: "human",
    website: "www.test.com",
  };
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(
    JSON.stringify({
      message: "GET Successful",
      data,
    })
  );
  res.end();
};
