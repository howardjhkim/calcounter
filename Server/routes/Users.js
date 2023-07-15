const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const {sign} = require('jsonwebtoken')
const {validateToken} = require("../middlewares/AuthMiddleware")


router.post("/", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      firstName: firstName,
      lastName: lastName
    });
    res.json("SUCCESS");
  });
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  
  if (!user) {
    res.json({ error: "User Doesn't Exist" });
    return;
  } 

  if (!user.password) {
    res.json({error: "User Password is wrong"})
    return;
  }

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "abcde"
    );
    // res.json(accessToken);
    res.json({token: accessToken, username: username, id: user.id, firstName: user.firstName})
  });
});


router.get('/auth', validateToken, (req, res) => {
  res.json(req.user)
})


router.get('/basicinfo/:id', async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {attributes: {exclude: ['password']}})

  res.json(basicInfo)
})


module.exports = router;


