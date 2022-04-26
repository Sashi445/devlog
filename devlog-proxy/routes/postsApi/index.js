const axios = require("axios");

const express = require("express");
const Community = require("./../../models/community");

const Repo = require("./../../models/repo");
const Post = require("./../../models/post");
const User = require("./../../models/user");
const getUserPosts = require("./getUserPosts");

const router = express.Router();

function getLikeStatusandBookMarkStatus(likes, user, bookmarks) {
  const liked = likes.includes(user);
  const bookmarked = bookmarks.includes(user);
  return { liked, bookmarked };
}

// like posts*
router.post("/like/:post/:user", async (req, res) => {
  const { post, user } = req.params;

  try {
    const dbPost = await Post.findById(post);

    const liked = dbPost.likes.includes(user);

    const userRef = await User.findOne({ username: user });

    const { username, avatar } = userRef;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: post },
      {
        likes: liked
          ? [...dbPost.likes].filter(e => e !== user)
          : [...dbPost.likes, user],
      },
      {
        new : true
      }
    );

    return res.json({
      id: updatedPost.id,
      repoRef: updatedPost.repoRef,
      username,
      userRef,
      avatar,
      postContent: updatedPost.postContent,
      likes: updatedPost.likes,
      bookmarks: updatedPost.bookmarks,
      repoName: updatedPost.repoName,
      tags: updatedPost.tags,
      createdAt: updatedPost.createdAt,
    });

  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
});

// bookmark posts*
router.post("/bookmark/:post/:user", async (req, res) => {
  const { post, user } = req.params;

  try {
    const dbPost = await Post.findById(post);

    const bookmarked = dbPost.bookmarks.includes(user);

    const userRef = await User.findOne({ username: user });

    const { username, avatar } = userRef;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: post },
      {
        bookmarks: bookmarked
          ? [...dbPost.bookmarks].filter((e) => e !== user)
          : [...dbPost.bookmarks, user],
      }, 
      {
        new : true
      }
    )

    return res.json({
      id: updatedPost.id,
      repoRef: updatedPost.repoRef,
      username,
      userRef,
      avatar,
      postContent: updatedPost.postContent,
      likes: updatedPost.likes,
      bookmarks: updatedPost.bookmarks,
      repoName: updatedPost.repoName,
      tags: updatedPost.tags,
      createdAt: updatedPost.createdAt,
    });

  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// get user repos*
router.get("/repos/post/:user", async (req, res) => {
  const { user } = req.params;

  try {
    const dbUser = await User.findOne({
      username: user,
    });

    const dbRepos = await Repo.find({
      userRef: dbUser,
    });

    const refined = dbRepos.map((repo) => ({
      id: repo.repoId,
      nodeId: repo.nodeId,
      name: repo.name,
      fullName: repo.fullName,
      description: repo.description,
    }));

    return res.send(refined);
  } catch (e) {
    console.error(e.message);
    return res.send(e.message);
  }
});

// get user posts*
router.get("/:username", async (req, res) => {

    const { username } = req.params;

  try {

    const dbUser = await User.findOne({
      username: username,
    });

    const posts = await getUserPosts(dbUser)
    console.log(posts);

    return res.json(posts.reverse());

  } catch (e) {

    console.log(e.message);

    return res
      .status(400)
      .send(`Something went wrong while reading from DB : ${e.message}`);
  }
});

// create post*
router.post("/:user", async (req, res) => {
  const { user } = req.params;

  const { tags, postContent, repo } = req.body;

  try {
    const userInstance = await User.findOne({
      username: user,
    });

    const dbRepo = await Repo.findOne({
      repoId: repo,
    });

    const post = new Post({
      tags: tags,
      postContent: postContent,
      repoRef: dbRepo,
      user: userInstance,
      repoName: dbRepo.name,
      likes: [],
      bookmarks: [],
    });

    await post.save().then((doc) => {
      return res.json({
        tags: doc.tags,
        postContent: doc.postContent,
        repoName: doc.repoName,
        username: userInstance.username,
        avatar: userInstance.avatar,
        likes: doc.likes,
        bookmarks: doc.bookmarks,
        id: doc._id,
        liked: false,
        bookmarked: false,
        userRef : userInstance,
        createdAt : doc.createdAt
      });
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;
