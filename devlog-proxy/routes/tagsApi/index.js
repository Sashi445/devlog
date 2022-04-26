const express = require("express");
const router = express.Router();

const Post = require("./../../models/post");

router.get("/all", async (req, res) => {

    try{

        const posts = await Post.find({});

        const uniqueTags = [];

        posts.forEach(post => {

            post.tags.forEach(tag => {

               if ( !uniqueTags.includes(tag) ) {
                   uniqueTags.push(tag);
               } 

            })

        });
        
        return res.json(uniqueTags.map((tag, index) => ({
            id : index + 1,
            value : tag 
        })));


    }catch(e){

        console.log(e.message);

        return res.status(400).send(e.message);

    }

});

// get posts by tags

router.get("/", async (req, res) => {

    const { selected } = req.query;

    const tags = selected.split("|");

    try{

        const sPosts = await Post.aggregate([
            {
                "$match" : { "tags" : { "$all" : tags } }
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

        sPosts.forEach((post)=>{
            post.userRef = post.userRef[0]
        })

        return res.json(sPosts);

    } catch(e) {

        console.error(e.message);

        return res.status(400).send(e.message);

    }

})


module.exports = router;