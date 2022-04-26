const axios = require("axios");
const express = require("express");
const router = express.Router();

//models
// const User = require("./../models/user");
// const runRepoStatusChecks = require("./../utils/repoCheck");

// // login to account

// router.post("/", async (req, res) => {

// })

const defaultHeaders = { accept: "application/json" };

// GITHUB auth sets accessToken from github
async function getGithubAccessToken(req, res, next) {
  const { code } = req.body;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
  try {
    const response = await axios.post(url, {}, { headers: defaultHeaders });
    const accessToken = response.data.access_token;
    req.accessToken = accessToken;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
}

// gets the user from the GITHUB DB with accessToken
async function getUser(req, res, next) {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${req.accessToken}`,
        accept: "application/json",
      },
    });
    req.user = response.data;
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

// Checks if the user is present in devlog DB or not
async function checkUser(req, res, next) {
  try {
    const { id, login, avatar_url: avatar } = req.user;
    // check database if user exists return true else false
    let user = await User.findOne({ userRef: id });
    if (!user) {
      user = new User({ userRef: id, username: login,avatar: avatar });
      await user.save();
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

router.post("/login", getGithubAccessToken, getUser, checkUser, async (req, res) => {
  console.log(req.accessToken);
  return res.json({
    accessToken: req.accessToken,
  });
});

// login to account
// router.post("/", async (req, res) => {

//   const { code } = req.body;
//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;

//   const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

//   try {
//     const response = await axios.post(
//       url,
//       {},
//       {
//         headers: {
//           accept: "application/json",
//         },
//       }
//     );

//     const accessToken = response.data.access_token;

//     const user = await getUser(accessToken);

//     const exists = await checkUser(user);

//     await runRepoStatusChecks(exists, user, accessToken);

//     return res.json({
//       accessToken,
//       exists,
//       user,
//     });
//   } catch (err) {

//     return res.status(400).send(err.message);

//   }
// });

module.exports = router;
