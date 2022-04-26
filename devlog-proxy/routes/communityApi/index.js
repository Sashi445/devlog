const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("./../../models/user");
const Repo = require("./../../models/repo");
const Community = require("./../../models/community");

// given username gets all repos

router.get("/:username", async (request, response) => {
  
  const { username } = request.params;

  const { authorization } = request.headers;

  const headers = {
    authorization: authorization,
    accept: "application/vnd.github.v3+json",
  };

  try {
    const user = await User.findOne({
      username: username,
    });

    // userRepos

    const userRepos = await Repo.find({
      userRef: user,
    });

    const promises = userRepos.map(async (repo) => {


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
          user: user,
          tags: tags.data,
          languages: languages.data,
          // readme : readme
        };
      } catch (e) {
        console.log(e.message);
      }

    });

    Promise.all(promises).then((results) => {
      return response.json(results);
    });


  } catch (e) {
    console.error(e.message);
    return response
      .status(500)
      .send("Something went wrong while retrieving docs");
  }
});

// get readme data of the repo
const getReadmeData = async (url, headers) => {
  try {
    const readme = await axios.get(url, {
      headers: headers,
    });

    return  { ...readme.data, exists : true};

  } catch (e) {

    return { exists : false }

  }
};

module.exports = router;
