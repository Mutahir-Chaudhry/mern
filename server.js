const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});

//Models
const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.json({
    ok: "Message"
  });
});

app.get("/api", (req, res) => {
  User.find({})
    .then(function(data) {
      res.json({ data });
    })
    .catch(function(err) {
      res.json({ err });
    });
});

app.post('/submit', (req, res) => {
    const data = req.body;
    console.log("Data: ", data);
    res.json({
        ok: "We recieved your data"
    });
});

app.listen(PORT, () => {
  console.log("Server listening on PORT:" + PORT);
});
