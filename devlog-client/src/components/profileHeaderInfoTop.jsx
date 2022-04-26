
const ProfileHeaderInfoTop = ({ devlogUser, posts, followers, following }) => {
    return (<div className="row">
        {devlogUser ? <div className="col-md-4 col text-center">
            <span className="h4 font-bolder">{posts}</span>
            <span className="d-block text-sm">Posts</span>
        </div> : <></>}
        <div className="col-md-4 col text-center">
            <span className="h4 font-bolder">{following}</span>
            <span className="d-block text-sm">Following</span>
        </div>
        <div className="col-md-4 col text-center">
            <span className="h4 font-bolder">{followers}</span>
            <span className="d-block text-sm">Followers</span>
        </div>
    </div>);
}

export default ProfileHeaderInfoTop;