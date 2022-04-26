import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import DiscussionPage from "./discussion";
import RepoPostsComponent from './repoPostsComponent';
import serverConfig from './../app/ServerConfig';
import axios from "axios";
import ContributorsComponent from './ContributorsComponent';

const RepoInfoComponent = ({ repoRef, accessToken, contributors, posts, readme }) => {

    const [selected, setSelected] = useState(1);

    const selectionsList = [
        {
            name: "Readme",
            id: 1
        },
        {
            name: "Posts",
            id: 2
        },
        {
            name: "Contributors",
            id: 3
        },
        {
            id: 4,
            name: "Discussion"
        }
    ];

    return (
        <div>
            <div className="d-flex">
                {selectionsList.map(i => (<div className={`cursor-pointer mx-2 ${selected === i.id ? "text-primary border-bottom-3 border-primary" : ""} `} onClick={() => setSelected(i.id)} key={i.id}>{i.name}</div>))}
            </div>
            <div className="py-3">
                {switchComponents(selected, repoRef, accessToken)}
            </div>
        </div>
    );
}

function switchComponents(selected, repoRef, accessToken) {
    switch (selected) {

        case 1: return (<div className="container py-2">
            <h5>README</h5>
        </div>)

        case 3: return <ContributorsComponent repoRef={repoRef} accessToken={accessToken} />

        case 2: return <RepoPostsComponent repoRef={repoRef} />

        case 4: return <DiscussionPage></DiscussionPage>

        default: return <></>
    }
}






const mapStateToProps = (state, ownProps) => ({
    contributors: ownProps.contributors,
    accessToken: state.user.accessToken,
    posts: state.posts.posts.filter(e => e.repoRef === ownProps.repoRef),
    readme: "README"
})

export default connect(mapStateToProps)(RepoInfoComponent);