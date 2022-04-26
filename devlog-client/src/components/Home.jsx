import React, { useEffect } from "react";
import PostBox from "./Post";
import PostView from "./PostView";
import { connect } from "react-redux";
import { fetchPostAsync } from "../features/post/action";
import store from "../app/store";
import { Link } from "react-router-dom";
import Pagination from "./Pagination.jsx";

const Home = ({ user, posts, accessToken }) => {
  
  const tags = ["javascript", "react", "redux", "nodejs"];

  useEffect(async () => {
    console.log("Home Page!!");
    const actionLoad = await fetchPostAsync(accessToken, user.login);
    console.log(actionLoad);
    store.dispatch(actionLoad);
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="left col-lg-3 col-md-4 col">
          <p>
            {" "}
            <strong> Hello, {user.login} </strong>👋
          </p>
          <div className="mt-5">
            <strong>
              <Link to="/tags">Tags to follow</Link>
            </strong>
            <ul className="list-group mt-3">
              {tags.map((tag) => (
                <li className="list-group-item cursor-pointer">#{tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="center col-lg-6 col-md-8 col">
          <PostBox />
          <Pagination items = {posts} itemsPerPage = {2} />
        </div>
        <div className="right col-lg-3 d-lg-block d-none">
          <strong>Suggestions</strong>
          <ul className="list-group mt-3">
            <li className="list-group-item cursor-pointer">trending</li>
            <li className="list-group-item cursor-pointer">topics</li>
            <li className="list-group-item cursor-pointer">videos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.instance,
  posts: state.posts.posts,
  accessToken: state.user.accessToken,
});

export default connect(mapStateToProps)(Home);
