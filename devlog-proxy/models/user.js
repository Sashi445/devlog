const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userRef : { type : Number, required : true},
    username : {type : String},
    joinedAt :  { type : Date, default : Date.now },
    avatar : { type : String }
})

const User = mongoose.model("User", userSchema);

module.exports = User;