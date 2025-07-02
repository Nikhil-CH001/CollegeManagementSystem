const express = require("express");
const { db } = require("./config/database");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ✅ Session for Passport
app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: false
}));

// ✅ Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const pageRoutes = require("./routes/pageRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/", pageRoutes);
app.use("/", authRoutes);

// DB and Server

  app.listen(4444, () => {
    console.log("✅ Server is running on http://localhost:4444");
  });

