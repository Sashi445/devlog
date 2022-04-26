const axios = require("axios");
const express = require("express");
const router = express.Router();

const User = require("./../models/user");

// check user in db 
const checkUser = async (username) => {
    const result = await User.findOne({
        username : username
    });

    if (!result){
        return null;
    }

    return result;
}

// function to fetch user details
const getUserInfo = async (user) => {

    try{

        const response = await axios.get(`https://api.github.com/users/${user}`, {
            headers : {
                accept : "application/vnd.github.v3+json"
            }
        })

        const { login: username ,  id, avatar_url : avatar, followers, following } = response.data;
        
        return ({
            id,
            username,
            avatar,
            followers,
            following
        });

    }catch(e) {

        console.log(e.message);

        return new Error(e.message);

    }
}

// get method to retrive user information*
router.get("/user/:username", async (req, res) => {

    const { username } = req.params;

    try{

        const result = await checkUser(username);

        if (!result) {

            const userInfo = await getUserInfo(username);

            return res.json(userInfo.data);

        } else{

            return res.json(result);

        }

    }catch(e){

        console.log(e.message);
        return res.status(400).send(e.message);
    
    }

})

// get profile information of user from github
router.get("/", async (request, response) => {

    const { authorization } = request.headers;

    const headers = {
        authorization : authorization,
        accept : "application/vnd.github.v3+json" 
    }

    try{

        const profile = await axios.get("https://api.github.com/user", {headers : headers}).then(res => res.data);

        const { followers_url } = profile;

        const followers = await axios.get(followers_url, {headers : headers}).then(res => res.data);

        const following = await axios.get(`https://api.github.com/users/${profile.login}/following`, {headers : headers}).then(res => res.data);

        function getUsers(items){
           return items.map(e => ({
            username : e.login,
            avatar : e.avatar_url,
            url : e.html_url
        }))
        
    }


        const result = {
            avatar : profile.avatar_url,
            id : profile.id,
            username : profile.login,
            followers : getUsers(followers),
            following : getUsers(following),
            name : profile.name,
            email : profile.email,
            bio : profile.bio
        }
        console.log('user profile: ', result)

        return response.json(result);

    }catch(e) {

        return response.send(e.message);
     
    }

});

module.exports = router