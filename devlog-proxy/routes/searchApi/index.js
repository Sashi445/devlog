const express = require("express");
const router = express.Router();

const axios = require("axios");

const User = require("./../../models/user");
const Repo = require("./../../models/repo");

//search github users from github API*

router.get("/:query", async (req, res) => {
  const { query } = req.params;

  try {
    const queryParameter = "q=" + encodeURI(`${query} in:login type:user`);

    const response = await axios.get(
      `https://api.github.com/search/users?${queryParameter}`,
      {
        headers: {
          accept: "application/vnd.github.v3+json",
        },
      }
    );

    const { items } = response.data;

    return res.json(items);
  } catch (e) {
    console.log(e.message);

    return res.status(400).send(e.message);
  }
});

// get repos when searched*

router.get("/repos/:query", async (req, res) => {
  const { query } = req.params;

  const { authorization } = req.headers;

  const headers = {
    authorization: authorization,
    accept: "application/vnd.github.v3+json",
  };

  try {
    const repos = await Repo.find({
      name: { $regex: query, $options: "i" },
    });

    const promises = repos.map(async (repo) => {
  
        try {
  
          const tags = await axios.get(repo.tagsUrl, {
            headers: headers,
          });
  
          const languages = await axios.get(repo.languagesUrl, {
            headers: headers,
          });
  
          return {
            repoRef : repo._id,
            repoName: repo.name,
            stargazers : repo.stargazers,
            forks : repo.forks,
            topics : repo.topics,
            description: repo.description,
            tags: tags.data,
            languages: languages.data,
            // readme : readme
          };
        } catch (e) {
          console.log(e.message);
        }
  
      });
  
      Promise.all(promises).then((results) => {
        return res.json(results);
      });

  } catch (e) {
    console.log(e.message);

    return res.status(400).send(e.message);
  }
});

// get method to retrive repos based on searchQuery

router.get("/devlog/:searchQuery", async (req, res) => {
  const searchQuery = req.params.searchQuery;

  try {
    const dbUser = await User.find({
      username: { $regex: searchQuery, $options: "i" },
    });

    const dbRepo = await Repo.find({
      name: { $regex: searchQuery, $options: "i" },
    });

    const searchResult = {
      users: dbUser,
      repos: dbRepo,
    };

    console.log(searchResult);

    return res.send(searchResult);
  } catch (err) {
    return res.send(err.message);
  }
});

// check if user exists in devlog DB

const checkUser = async (username) => {
  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    return false;
  }

  return true;
};

module.exports = router;
