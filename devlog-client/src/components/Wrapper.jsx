import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorPage from "./errorPage";
import Community from "./community";
import Explore from "./Explore";
import UserInfo from "./userInfo";
import LinkTest from "./linkTest";
import TagsPageComponent from "./tagsPage";
import RepoContent from "./repoContent";
import HomeWrapper from './HomeWrapper';

const Wrapper = () => {
    return <div className="App">
        <Navbar />
        <Switch>
            <Route path="/community/:repoName" component={RepoContent} />
            <Route path="/info/:targetuser" component={UserInfo} />
            <Route path="/tags" component={TagsPageComponent} />
            <Route path="/link-test" component={LinkTest} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/login" exact component={Login} />
            <Route path="/community" exact component={Community} />
            <Route path="/404" exact component={ErrorPage} />
            <Route exact path="/" component={HomeWrapper} />
        </Switch>
        <Footer />
    </div>;


}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})


export default connect(mapStateToProps)(Wrapper);