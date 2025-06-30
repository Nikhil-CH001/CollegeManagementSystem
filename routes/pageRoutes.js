const express = require("express")
const router = express.Router()
const {verifyToken} = require("../middlewares/auth")

//home page
router.get("/", (req,res)=>{
    res.render("pages/home")
})

// About Page
router.get("/about",verifyToken, (req, res) => {
  res.render("pages/about");
});

// Contact Page
router.get("/contact",verifyToken, (req, res) => {
  res.render("pages/contact");
});

module.exports = router