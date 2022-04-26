const Post = require("./../../models/post");

function getLikeStatusandBookMarkStatus(likes, user, bookmarks) {
  const liked = likes.includes(user);
  const bookmarked = bookmarks.includes(user);
  return { liked, bookmarked };
}

const getUserPosts = async (userRef) => {

  const postsNew = await Post.aggregate([
    {
      "$match" : { user : userRef._id }
    },
    {
      "$lookup" : {
        "from" : "users",
        "localField" : "user",
        "foreignField" : "_id",
        "as" : "userRef"
      }
    },
    { "$unwind": "$userRef" },
    // {
      // "$project": {
      //   "_id": 1,
      //   "repoRef": 1,
      //   "postContent": 1,
      //   "likes": 1,
      //   "bookmarks": 1,
      //   "tags": 1,
      //   "repoName": 1,
      //   "createdAt": 1,
      //   "liked": {
      //     "$cond": {
      //       if: { "$in": [ userRef.username, likes ] },
      //       then: true,
      //       else: false
      //     }
      //   }
      // }
    // }
  ]);

  console.log('post-new', postsNew)

  const posts = await Post.find({
    user: userRef,
  });

  const refined = postsNew.map(post => {
    const { liked, bookmarked } = getLikeStatusandBookMarkStatus(
        [...post.likes],
        userRef.username,
        [...post.bookmarks]
      );

      const {
        _id : id,
        repoRef,
        postContent,
        likes,
        bookmarks,
        createdAt,
        tags,
        repoName,
      } = post;

      console.log("I,m post", post)

      return {
        id,
        repoRef,
        userRef : userRef,
        avatar: userRef.avatar,
        postContent,
        likes,
        bookmarks,
        createdAt,
        tags,
        repoName,
        liked,
        bookmarked,
      };
  });

  return refined;

};

module.exports = getUserPosts;
