var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/post-message", (req, res) => {
  const dateTime = new Date().toLocaleDateString("en-US");
  const clientMessage = req.body.clientMessage
  console.log(clientMessage);
  res.json({serverMessage : `Received client message: ${clientMessage}. Responded at ${dateTime.toString()}`})
});

module.exports = router;
