
const mongoose = require("mongoose")

const repoSchema = mongoose.Schema({
    userRef : { type : mongoose.Schema.Types.ObjectId, required : true },
    repoId : { type : String, required : true},
    nodeId : { type : String, required : true },
    name : { type : String, required : true},
    fullName : { type : String },
    description : { type : String },
    contribsUrl : { type : String },
    tagsUrl : { type : String },
    languagesUrl :  { type : String },
    readmeUrl : {type : String},
    forks : { type : Number },
    stargazers : { type : Number },
    topics : { type : [ String ] },
    hasIssues : { type : Boolean }
});

const Repo = mongoose.model("REPO", repoSchema);

module.exports = Repo;
