var express = require("express");
var router = express.Router();
const { uuid } = require("uuidv4");
// npm i uuidv4

const userList = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "jd@gmail.com",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET users
router.get("/get-users", function (req, res) {
  res.json(userList);
});

router.post("/post-message", (req, res) => {
  try {
    const clientMessage = req.body.clientMessage;
    const dateTime = new Date().toLocaleDateString("en-US");
    const response = `Received client message ${clientMessage}. Responded at ${dateTime.toString()}`;
    res.json({ serverMessage: response }).status(200);
  } catch (e) {
    console.log(`Message not sent ${e}`, e);
    res.json({ serverMessage: `${e}` }).status(500);
  }
});

router.post("/create-user", async (req, res) => {
  try {
    const uid = uuid();
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const newUser = {
      uid,
      firstName,
      lastName,
      email,
    };
    userList.push(newUser);
    res
      .json({ serverMessage: `New user successfully created.`, success: true })
      .status(200);
  } catch (e) {
    console.log(`Error user not created`, e);
    res.json({ serverMessage: `${e}`, success: false }).status(500);
  }
});

module.exports = router;
