const axios = require("axios");
const express = require("express");

const router = express.Router();

const Post = require("../../models/post");
const Repo = require("../../models/repo");

// given repoRef get all contributors of the repo

router.get("/contributors/:repoRef", async (req, res) => {
    
    const { repoRef } = req.params;

    const { authorization } = req.headers;

    const headers = {
        authorization: authorization,
        accept: "application/vnd.github.v3+json",
    };

    try{

        const repo = await Repo.findOne({
            _id : repoRef
        })

        const contributors = await axios.get(repo.contribsUrl, {
          headers: headers,
        });

        return res.json(contributors.data);

    } catch(e) {

        console.log(e.message);

        return res.status(400).send(e.message);

    }

})



// given repoRef get all the posts of the repo*

router.get("/posts/:repoRef", async (req, res) => {

    const { repoRef } = req.params;

    try{

        const repo = await Repo.findOne({
            _id : repoRef
        });

        const posts = await Post.aggregate([
            {
                "$match" : { "repoName" : `${repo.name}` }
            },
            {
                "$project" : {
                    "_id" : 0,
                    "id" : "$_id",
                    "repoRef" : 1,
                    "user" : 1,
                    "createdAt" : 1,
                    "postContent" : 1,
                    "likes" : 1,
                    "bookmarks" : 1,
                    "tags" : 1,
                    "repoName" : 1
                }
            },
            {
                "$lookup" : {
                    "from" : "users",
                    "localField" : "user",
                    "foreignField" : "_id",
                    "as" : "userRef"
                }
            }
        ]);

        // const refinedPosts = posts.map((post)=>({
        //     ...post,id:post._id
        // }))

        posts.forEach((post)=>{
            post.userRef = post.userRef[0]
        })

        return res.json(posts);

    }catch(e){

        console.log(e.message);

        return res.status(400).send(e.message);

    }


});


module.exports = router;
