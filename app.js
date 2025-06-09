const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect(
  "mongodb://mongo:JovcbvuokCjBJJAGdcmsBFmyRHRWAoHJ@shortline.proxy.rlwy.net:28165"
);

const Todo = mongoose.model("Todo", { text: String });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
});

app.post("/add", async (req, res) => {
  const { text } = req.body;
  if (text) await Todo.create({ text });
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
