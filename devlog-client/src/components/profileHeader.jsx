import ProfileHeaderInfoBottom from "./profileHeaderInfoBottom";
import ProfileHeaderInfoTop from './profileHeaderInfoTop';
import { useLocation } from 'react-router-dom';

const ProfileHeader = ({ avatar, username, followers, following, devlogUser, posts }) => {

    const location = useLocation();

    console.log(location.pathname);

    return (
        <div className="row align-items-center">
            <div className="col-lg-4 col-md-3">
                <div className="d-flex justify-content-center">
                    <span className="avatar avatar-xl rounded-circle">
                        <img className="avatar avatar-xl rounded-circle" src={`${avatar}`} alt="" />
                    </span>
                </div>
                <div className="text-center my-6">
                    <h5>{username}</h5>
                </div>
            </div>
            <div className="col-lg-8 col-md-9">
                <ProfileHeaderInfoTop devlogUser={devlogUser} followers={followers} following={following} posts={posts} />
                {location.pathname === "/profile" ? <></> : <ProfileHeaderInfoBottom devlogUser={devlogUser}/>}
            </div>
        </div>
    );
}

export default ProfileHeader;


