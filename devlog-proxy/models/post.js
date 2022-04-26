const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    repoRef : { type : mongoose.Schema.Types.ObjectId, required : true},
    user : { type : mongoose.Schema.Types.ObjectId, required : true},
    createdAt :  { type : Date, default : Date.now },
    postContent : { type : String },
    // attachments : { type : [ String ], required : true },
    likes : [ { type : String } ],
    bookmarks : [ { type : String } ],
    tags : [ String ],
    repoName : { type : String, required : true }
})

const Post = mongoose.model("POST", postSchema);

module.exports = Post;