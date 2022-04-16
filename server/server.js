const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

dbConnect();
async function dbConnect() {
  const dbUrl = "mongodb://localhost:27017/chatDB";
  await mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
      (db) => {
        console.log("Database connection is successful");
      },
      (err) => console.log(err)
    );
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = new mongoose.model("user", userSchema);

const Room = new mongoose.model("room", roomSchema);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, found) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      if (found) {
        console.log("This email is already registered");
        res.status(400).send("already registered");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        newUser.save((err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Failed to add User");
          } else {
            console.log("successfully added to db");
            res.status(200).send();
          }
        });
      }
    }
  });
});

app.post("/login", (req, res) => {
  const mail = req.body.email;
  const password = req.body.password;
  User.findOne({ email: mail }, (err, founduser) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to login");
    } else {
      if (founduser) {
        if (founduser.password === password) {
          console.log("userfound");
          console.log(founduser);
          res.status(200).send(founduser.name);
        } else {
          console.log("invalid password");
          res.status(400).send("invalid password");
        }
      } else {
        console.log("please register first");
        res.status(400).send("Please register");
      }
    }
  });
});

app.post("/Chatpage", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  Room.findOne({ title: title }, (err, foundTitle) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to add");
    } else {
      if (foundTitle) {
        console.log("Title is already existing");
        res.status(400).send("title name is taken");
      } else {
        
        Room.create({title: title},(err,resp) => {
          if (err) {
            console.log(err);
            resp.status(500).send("Failed to add user");
          } else {
            console.log("successfully added to room db");
             resp.send();
          }
        });
      }
    }
  });
});

app.listen(5000, function () {
  console.log("Server started on port 5000...");
});
