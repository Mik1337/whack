import express from "express";

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("app running on http://localhost:3000"));
