const axios = require("axios");
const User = require("./../models/user");

const ApiConfiguration= require("./apiConfig");

const { headerAccept, rootApiUrl } = ApiConfiguration;

// Checks if a user exists in the devlog DB and returns true or false

const checkUser = async (username) => {

    const result  = await User.findOne({
        username : username
    })

    if (!result) {
        return false;
    }

    return true;

}

// returns the user from devlog DB

const readUserFromDb = async (username) => {
    try{

        const dbUser =  await User.findOne({
            username : username
        });

        const gitUser = await readUserFromGithub(username);

        return {
            userRef : dbUser, 
            username : username,
            avatar : dbUser.avatar,
            id : dbUser._id,
            followers : gitUser.followers,
            following : gitUser.following
        }

    }catch(e) {
        console.error(e);
        throw e;
    } 
}

// reads user data from github API and returns the same.

const readUserFromGithub = async (username) => {

    try{

        const response = await axios.get(`${rootApiUrl}/users/${username}`, {
            headers : {
                accept : headerAccept
            }
        });

        const { id, avatar_url: avatar, followers, following, login : user  } = response.data;

        return ({ 
            id, 
            username: user,
            avatar, 
            followers,
            following
        });

    }catch(e) {

        console.error(e);
        throw e;
    }

}


module.exports.checkUser = checkUser;
module.exports.readUserFromDb = readUserFromDb;
module.exports.readUserFromGithub = readUserFromGithub;
