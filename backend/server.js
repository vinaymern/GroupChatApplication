const express = require("express");
const mongoose = require("mongoose");
const RegisterUser = require("./model");
const jwt = require("jsonwebtoken");
const msgmodel = require('./msgmodel')
const middleware = require("./middleware");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect(
    "mongodb+srv://vinay0410:vinay0410@cluster0.hcmyssz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"));

app.get("/", (req, res) => {
  res.send("My First MERN stack ");
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    let exist = await RegisterUser.findOne({ email });
    if (exist) return res.status(400).send("User already exist");
    if (password !== confirmpassword)
      return res.status(400).send("passwords are not matching");
    let newUser = new RegisterUser({
      username,
      email,
      password,
      confirmpassword,
    });
    await newUser.save();
    res.status(200).json({ message: "Registration successful.." });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await RegisterUser.findOne({ email });
    if (!exist) {
      return res.status(400).send("user not found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    console.log(payload);
    jwt.sign(payload, "jwtsecure", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
});

app.get("/myprofile", middleware, async (req, res) => {
  try {
    let exist = await RegisterUser.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("User not found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("server running...");
});

app.post('/addmsg',middleware,async(req,res)=>{
  try {
      const {text} = req.body;
      const exist = await RegisterUser.findById(req.user.id);
      let newmsg = new msgmodel({
        user : req.user.id,
        username : exist.username,
        text
      })
      await newmsg.save();
      let allmsg = await msgmodel.find()
      return res.json(allmsg)
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error')
  }
})

app.get('/getmsg',middleware,async(req,res)=>{
  try {
      let allmsg = await msgmodel.find()
      return res.json(allmsg)
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error')
  }
})