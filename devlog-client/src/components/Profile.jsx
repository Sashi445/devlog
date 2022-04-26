import React, { useEffect } from "react";
import axios from "axios";
import serverConfig from "./../app/ServerConfig";
import { connect } from "react-redux";
import store from "../app/store";
import fetchProfile from "../features/profile/action";
import PostView from "./PostView";
import ProfileHeader from "./profileHeader";
import Loader from "./Loader";

const Profile = ({ accessToken, profile, posts }) => {
  useEffect(async () => {
    if (!profile) {
      console.log("hello");
      const profileData = await axios.get(`${serverConfig.proxyUrl}/profile`, {
        headers: serverConfig.getHeaders(accessToken)
      });
      store.dispatch(fetchProfile(profileData.data));
    }
  }, []);

  if (!profile) {
    return (<div className="container text-center py-3">
    <Loader/>
</div>)
  }

  const { followers, following } = profile;

  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ProfileHeader
            self={true}
            devlogUser={true}
            posts={posts.length}
            followers={followers.length}
            following={following.length}
            username={profile.username}
            avatar={profile.avatar}
          />
          <div>
            <hr />
            {posts.map((post) => (
              <PostView key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.user.accessToken,
  profile: state.profile.profile,
  posts: state.posts.posts,
});

export default connect(mapStateToProps)(Profile);
