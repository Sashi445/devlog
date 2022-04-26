const axios = require("axios");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const ApiConfiguration = require("../utils/apiConfig");

const { checkUser, readUserFromDb, readUserFromGithub } = require("../utils/userCheck");
const getUserPosts = require("./postsApi/getUserPosts");

const  { buildHeadersWithAccessToken, rootApiUrl, headerAccept} = ApiConfiguration;


// check if a user follows another user*

router.get("/:user/follows/:targetuser", async (req, res) => {

    const { user , targetuser } = req.params;

    try{ 

        const response = await axios.get(
            `${rootApiUrl}/users/${user}/following/${targetuser}`,
            {
                headers : {
                    accept : headerAccept
                }
            }
        );

        const follows = response.status === 204 ? true : false ;

        return res.json({follows});


    }catch(e) {


        if (e.response.status === 404){
            return res.status(200).jsonp({ follows : false });
        } 

        console.error(e.message);

        return res.status(400).send(e.message);

    }

})


// for profiles in search results*

router.get("/info/:username", async (req, res) => {

    const { username } = req.params;

    try{

        const result = await checkUser(username);

        if (result) {

            const user = await readUserFromDb(username);

            const posts = await getUserPosts(user.userRef);

            const response = {
                ...user,
                posts : [...posts],
                exists : true
            }

            return res.json(response);

        } else{

            const user = await readUserFromGithub(username);

            const response = {
                ...user,
                posts : [],
                exists : false
            }

            return res.json(response);

        }


    }catch(e){

        console.log(e.message);

        return res.status(400).send(e.message);
    }

}) 


// follow a user

router.put("/follow/:username", async (request, response) => {
    
    const { username } = request.params;

    const { authorization } = request.headers;

    // const headers = buildHeadersWithAccessToken(authorization);

    try{

        const result = await axios.put(`https://api.github.com/user/following/${username}`, {}, {
            headers : {
                "authorization" : authorization,
                "accept" : "application/vnd.github.v3+json",
            }
        });

        console.log(result.status);

        return response.json({ follows :  true });
    
    }catch(e){

        console.log(e.response.status);

        console.log(e.message);

        return response.status(400).send(e.message);
    }

})


// unfollow a user

router.delete("/follow/:username", async (request, response) => {
    
    const { username } = request.params;

    const { authorization } = request.headers;

    try{

        const result = await axios.delete(`https://api.github.com/user/following/${username}`, {
            headers : {
                "authorization" : authorization,
                "accept" : "application/vnd.github.v3+json"
            }
        });

        console.log(result.status);

        return response.json({ follows : false });
    
    }catch(e){

        console.log(e.response.status);

        console.log(e.message);

        return response.send(e.message);
    
    }

})


module.exports = router;