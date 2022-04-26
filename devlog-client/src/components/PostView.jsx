import { useState } from "react";
import { AiOutlineShareAlt, AiOutlineSend } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { connect } from "react-redux";
import store from "../app/store";
import { bookmarkPostAsync, likePostAsync } from "../features/post/action";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostView = ({ post, accessToken, user }) => {
  const {
    tags,
    id,
    likes,
    bookmarks,
    repoName,
    createdAt,
    comments,
    shares,
    postContent,
    userRef
  } = post;

  const { avatar, username } = userRef

  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="card mt-2 shadow-4">
      <div className="card-header p-4 d-flex">
        <div className="card-header-avatar">
          <Link to={`/info/${username}`}>
            <img src={`${avatar}`} className="rounded-circle" alt="" />
          </Link>
        </div>
        <div className="mx-2">
          <Link to={`/info/${username}`}>
            <h6>
              {username}/{repoName}
            </h6>
          </Link>

          {/* <h4 className="d-inline">{post.username}</h4> in <h5 className="d-inline">{post.repo}</h5> */}
          <p className="fs-6 text-muted">{createdAt}</p>
        </div>
      </div>
      <div className="card-body p-2">
        <p>{postContent}</p>
        <hr />
        <div>
          {tags.map((tag, index) => (
            <span className="badge bg-warning mx-1" key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer p-0">
        <div className="btn-group d-flex" role="group" aria-label="buttons">
          <LikeComponent
            accessToken={accessToken}
            likes={likes}
            username={user}
            id={id}
          />
          <button
            className="bg-white btn shadow-none"
            onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}
          >
            <GoComment /> {comments}
          </button>
          <button className="bg-white btn shadow-none">
            <AiOutlineShareAlt /> {shares}
          </button>
          <BookmarkComponent
            accessToken={accessToken}
            bookmarks={bookmarks}
            username={user}
            id={id}
          />
        </div>
        {isCommentBoxOpen && (
          <div className="input-group shadow-none border-top">
            <div className="card-footer-avatar my-auto mx-2">
              <img src={`${avatar}`} className="rounded-circle" alt="" />
            </div>
            <input
              type="text"
              value={comment}
              className="form-control border-0"
              placeholder="Comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn btn-outline shadow-none" type="button">
              <AiOutlineSend />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user.instance.login,
  post: ownProps.post,
  accessToken: state.user.accessToken,
});

export default connect(mapStateToProps)(PostView);

const LikeComponent = ({ accessToken, username, likes, id }) => {
  const handleLike = async (postId) => {
    console.log("Clicked Like!!");
    const actionLoad = await likePostAsync(accessToken, username, postId);
    console.log(actionLoad);
    store.dispatch(actionLoad);
  };

  return (
    <span
      className="bg-white btn shadow-none"
      onClick={async () => {
        await handleLike(id);
      }}
    >
      {likes.includes(username) ? <FaHeart color="red" /> : <FaRegHeart />}{" "}
      {likes.length}
    </span>
  );
};

const BookmarkComponent = ({ accessToken, username, bookmarks, id }) => {
  const handleBookmark = async (postId) => {
    console.log("Bookmarking Post!!");
    const actionLoad = await bookmarkPostAsync(accessToken, username, postId);
    console.log(actionLoad);
    store.dispatch(actionLoad);
  };

  return (
    <span
      className="bg-white btn shadow-none"
      onClick={async () => {
        await handleBookmark(id);
      }}
    >
      {bookmarks.includes(username) ? <FaBookmark /> : <FaRegBookmark />}
    </span>
  );
};
