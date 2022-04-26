const axios = require("axios");

const User = require("./../models/user");
const Repo = require("./../models/repo");
const Community = require("../models/community");
const res = require("express/lib/response");

const headers = { accept: "application/vnd.github.v3+json" };

async function checkRepoStatus(repoId, user) {
  try {
    let repo = await Repo.findOne({ repoId });
    if (!repo) {
      repo = new Repo({ ...repo, userRef: user });
      await repo.save();
    }
    return repo;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function checkRepos(req, res, next) {
  try {
    const repos = await getRepos(req.user.username);
    // createRepos(req.user);

    Promise.all(repos.map(async (repo) => await checkRepoStatus(repo.repoId, req.user)))
  } catch (error) {}
}

const runRepoStatusChecks = async function (exists, user, accessToken) {
  const { login: username } = user;

  console.log("INITIATED REPO STATUS CHECKS");

  if (!exists) {
    const repos = await getRepos(username);

    const dbUser = await User.findOne({
      username: username,
    });

    await createRepos(dbUser, repos);

    console.log("CREATED REPOS FOR NEW USER!!");
  } else {
    //TODO write code here to check if user has deleted any repos and remove instances from the db.

    console.log("USER ALREADY EXISTS NO NEED OF CREATING NEW REPOS!!");
  }
};

// get all the repos of that user
async function getRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  try {
    const response = await axios.get(url, { headers });
    const repos = response.data;
    return repos.map((repo) => {
      return {
        repoId: repo.id,
        nodeId: repo.node_id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        stargazers: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics,
        hasIssues: repo.has_issues,
        tagsUrl: `https://api.github.com/repos/${username}/${repo.name}/tags`,
        contribsUrl: `https://api.github.com/repos/${username}/${repo.name}/contributors`,
        languagesUrl: `https://api.github.com/repos/${username}/${repo.name}/languages`,
        readmeUrl: `https://api.github.com/repos/${username}/${repo.name}/readme`,
      };
    });
  } catch (ex) {
    console.log(ex.message);
    throw new Error(ex.message);
  }
}

async function createRepos(user, repos) {
  const reposModified = repos.map((repo) => ({ ...repo, userRef: user }));
  async function onInsert(err, docs) {
    if (err) {
      //TODO : handle error!!
    } else {
      // Create Community for each repo

      await docs.map(async (doc) => {
        const community = new Community({
          repoRef: doc,
        });

        await community.save();
      });

      return docs;
    }
  }
  Repo.insertMany(reposModified, onInsert);
}

module.exports = runRepoStatusChecks;
