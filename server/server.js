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

const User = new mongoose.model("user", userSchema);

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Room = new mongoose.model("room", roomSchema);

const chatSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    title_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = new mongoose.model("message", chatSchema);

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
          res.status(200).send(founduser);
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

app.get("/Chatpage", (req, res) => {
  const allrooms = [];
  Room.find({}, (err, rooms) => {
    rooms.forEach((room) => {
      allrooms.push(room.title);
      // console.log(room.title);
    });
    // console.log("titles of rooms"+rooms._id);
    res.status(200).send(allrooms);
  });
});

app.post("/Chatpage", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const userId = req.body.userId;
  Room.findOne({ title: title }, (err, foundTitle) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to add");
    } else {
      if (foundTitle) {
        console.log("Title is already existing");
        res.status(400).send("title name is taken");
      } else {
        Room.create({ title: title, user_id: userId }, (err, resp) => {
          if (err) {
            console.log(err);
            res.status(500).send("Failed to add user");
          } else {
            console.log("successfully added to room db");
            res.status(200).send();
          }
        });
      }
    }
  });
});

app.patch("/Chatpage", (req, res) => {
  let username = "";
  console.log("userid.. ..." + req.body.userId);
  Room.findOne({ user_id: req.body.userId }, (err, founduser) => {
    if (err) {
      console.log(err);
    } else {
      //  console.log("found"+founduser);
      User.findOne({ _id: req.body.userId }, (err, found) => {
        if (err) {
          console.log(err);
        } else {
          if (found) {
            username = found.name;
            Room.updateOne(
              { title: req.body.title },
              { $addToSet: { user_id: req.body.userId } },
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Successfully added the user to the channel ");
                  res.status(200).send(username);
                }
              }
            );
          }
        }
      });
    }
  });
});

app.post("/Chatpage/x/messages", (req, res) => {
  console.log(req.body);
  const newmsg = new Chat({
    msg: req.body.msg,
    title_id: req.body.titleId,
    user_id: req.body.userId,
  });
  newmsg.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("new message was added to db.");
      res.status(200).send();
    }
  });
});
let titleId = "";
app.post("/Chatpage/x/gettitleid", (req, res) => {
  console.log("from " + req.body.title);

  Room.findOne({ title: req.body.title }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      if (found) {
        console.log(found._id.toString());
        titleId = found._id.toString();
      }
    }
  });
  console.log(titleId);
  res.send(titleId);
});
app.get("/Chatpage/x/gettitleid", (req, res) => {
  res.send(titleId);
});
app.get("/Chatpage/:title", async (req, res) => {
  console.log(req.params.title);
  let foundroom = await Room.findOne({ title: req.params.title });
  console.log("foundroom " + foundroom);
  if (foundroom) {
    const titleId = foundroom._id;
    let foundusername;
    let i = 0;
    Chat.find(
      { title_id: mongoose.Types.ObjectId(titleId) },
      async (err, found) => {
        if (err) {
          console.log(err);
        } else {
          if (found) {
            for (let item of found) {
              foundusername = await User.findOne({ _id: item.user_id });
              found[i].username = foundusername.name;
              await found[i].save();
              i++;
            }
            console.log(found);
            res.status(200).send(found);
          } else {
            console.log("error in retrieving " + err);
          }
        }
      }
    );
  } else {
    console.log("invalid title name");
    res.status(500).send("invalid titlename request");
  }
});

app.listen(5000, function () {
  console.log("Server started on port 5000...");
});
