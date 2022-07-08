const express = require("express");
const fs = require("fs");
const app = express();
const router = require("./cartRouter");

app.use(express.json());
app.use("/", express.static("public"));
app.use("/api/cart", router);

app.get("/api/products", (req, res) => {
  fs.readFile("server/db/products.json", "utf-8", (err, data) => {
    if (err) {
      console.log(data);
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
