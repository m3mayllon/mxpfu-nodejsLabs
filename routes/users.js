const express = require("express");
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email: "johnwick@gmail.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email: "johnsmith@gmail.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email: "joyalwhite@gmail.com",
    DOB: "21-03-1989",
  },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});

// POST request: Create a new user
router.post("/", (req, res) => {
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  });
  res.send(`${req.query.email} has successfully been added!`);
});

// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    let filtered_user = filtered_users[0];

    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let DOB = req.query.DOB;

    if (firstName) {
      filtered_user.firstName = firstName;
    }
    if (lastName) {
      filtered_user.lastName = lastName;
    }
    if (DOB) {
      filtered_user.DOB = DOB;
    }

    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    res.send(`${email} has successfully been updated!`);
  } else {
    res.send("Unable to find user!");
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`${email} has successfully been deleted.`);
});

module.exports = router;
