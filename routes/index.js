var express = require("express");
var router = express.Router();

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

router.post("/post-message", async (req, res) => {
  try {
    const dateTime = new Date();
    const clientMessage = req.body.clientMessage;
    const response = `Received client message: ${clientMessage}. Responded at ${dateTime.toString()}`;
    res.json({ serverMessage: response }).status(200);
  } catch (error) {
    res.json({ success: false }).status(500);
  }
});

router.post("/create-user", (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const lastUser = userList[userList.length - 1];

    const newUser = {
      id: Number(lastUser.id + 1),
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    userList.push(newUser);

    res
      .status(200)
      .json({ message: "Successfully added new user", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding new user" + error, success: false });
  }
});

module.exports = router;
