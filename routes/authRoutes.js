// routes/authRoutes.js
const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {db} = require("../config/database")
const JWT = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
router.use(cookieParser())

require("dotenv").config()

// Show login/register page
router.get("/login", (req, res) => {
  res.render("authentication/auth");
});

// Register user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body
  const existingUser = await db.users.findOne({ where: { email } })
  if (existingUser) {
    return res.send("Email already registered")
  }
  await db.users.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
  })
  res.redirect("/")
})
// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
     const user = await db.users.findAll({
    where: {
      email: email,
    },
  })
  if (user.length == 0) {
    res.send("Email not registered")
  } else {
    const isPasswordMatch = bcrypt.compareSync(password, user[0].password)
    if (isPasswordMatch) {
      const token = JWT.sign({ id: user[0].id, username: user[0].username },process.env.JWT_SECRET, { expiresIn: "1d" })
      res.cookie("token", token)
      res.redirect("/")
    } else {
      res.send("Invalids credentials")
    }
  }
  } catch (error) {
    res.status(500).send("Login failed: " + error.message);
  }
});



// Google login route
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback route
router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/auth"
}));

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auth");
  });
});


module.exports = router;
