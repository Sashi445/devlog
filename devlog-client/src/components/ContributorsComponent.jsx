import { useState, useEffect } from "react";
import axios from "axios";
import serverConfig from "../app/ServerConfig";
import { Link } from "react-router-dom";

const ContributorsComponent = ({ repoRef, accessToken }) => {

    const [contributors, setContributors] = useState([]);

    useEffect(() => {

        console.log(repoRef);

        axios.get(`${serverConfig.proxyUrl}/repos/contributors/${repoRef}`, {
            headers: serverConfig.getHeaders(accessToken)
        })
            .then(res => {
                setContributors(res.data);
            }).catch(e => {
                console.log(e.message);
            });

    }, []);

    return <div className="row p-2" >
        {contributors.map(e => {
            console.log(e);
            const { login, id, avatar_url: avatar } = e;
            return <div key={id} className="col-lg-3 col-md-2 col-sm-12 m-1">
                <div className="card p-1 border border-secondary">
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="avatar avatar-md rounded-circle">
                            <img className="avatar avatar-md rounded-circle" src={`${avatar}`} alt="" />
                        </span>
                        <Link to={`/info/${login}`}><strong className="mx-3">{login}</strong></Link>
                    </div>
                </div>
            </div>
        })}
    </div>
}

export default ContributorsComponent;