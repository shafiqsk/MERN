const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("../db/connection");
const User = require("../model/userSchema");
// -----------------------------HOME PAGE------------------------------
router.get("/", (req, res) => {
  res.send(`Hello from Backend`);
});

// --------------------------SIGNUP PAGE---------------------------
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill data properly" });
  }
  try {
    const userExsist = await User.findOne({ email: email });
    console.log(userExsist);
    if (userExsist) {
      return res.status(400).json({ error: "user already exist" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    await user.save();
    res.status(201).json({ message: "successfully registerred" });
  } catch (error) {
    console.log("somthing is wrong", error);
  }
});

// -----------------------------LOGIN PAGE------------------------------
router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz fill the fields" });
    }
    const userlogin = await User.findOne({ email: email });
    if (!userlogin) {
      return res.status(401).json({ message: "Invalid Credential Em" });
    }
    const isMatch = await bcrypt.compare(password, userlogin.password);

    if (!isMatch) {
      res.status(402).json({ error: "Invalid Credential p" });
    } else if (isMatch) {
      res.status(200).json({ message: "LoggedIn successfully" });
    } else {
      res.status(403).json({ error: "Invalid Credential er" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/home", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});

module.exports = router;
