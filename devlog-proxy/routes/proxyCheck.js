const axios = require("axios");
const express = require("express");
const router = express.Router();

//models

const User = require("./../models/user");

const runRepoStatusChecks = require("./../utils/repoCheck");

// login to account 
router.post("/", async (req, res) => {
  
  const { code } = req.body;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;

    const user = await getUser(accessToken);

    const exists = await checkUser(user);

    await runRepoStatusChecks(exists, user, accessToken);

    return res.json({
      accessToken,
      exists,
      user,
    });
  } catch (err) {
    
    return res.status(400).send(err.message);
  
  }
});

// get user using accessToken
async function getUser(accessToken) {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    });

    return response.data;
  } catch (er) {
    return new Error(er.message);
  }
}

// check user in db
async function checkUser(user) {
  try {
    const { id, login, avatar_url  : avatar } = user;

    // check database if user exists return true else false

    const response = await User.findOne({
      userRef: id,
    });

    if (!response) {
      const newUser = new User({
        userRef: id,
        username : login,
        avatar : avatar
      });

      await newUser.save().then((re) => {
        console.log(re);
      });

      return false;
    }
    return true;

  } catch (er) {
    
    console.log(er.message);
    return new Error(er.message);
  
  }
}

module.exports = router;
