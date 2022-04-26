const mongoose = require("mongoose")

const communitySchema = mongoose.Schema({
    repoRef : { type : mongoose.Schema.Types.ObjectId, required : true },
    // postRefs : [ { type : mongoose.Types.ObjectId } ],
})

const Community = mongoose.model("COMMUNITY", communitySchema);

module.exports = Community;

