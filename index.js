import express from "express";

const app = express();

const port = parseInt(process.env.PORT, 10) || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port);
