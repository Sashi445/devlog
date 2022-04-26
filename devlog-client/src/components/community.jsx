import React,{useState, useEffect} from 'react';
import RepoHandler from './repoHandler';
import axios from 'axios';
import { connect } from 'react-redux';
import serverConfig from './../app/ServerConfig';
import { useHistory } from 'react-router';
import Loader from './Loader';
import CommunityPagination from './communityPagination';


const Community = ({ accessToken, user}) => {

    const [ repos, setRepos ] = useState([]); 

    const history = useHistory();

    useEffect(() => {

        const url = serverConfig.proxyUrl
        
        axios.get(`${url}/community/${user}`, {
            headers : serverConfig.getHeaders(accessToken),
        }).then(res => {          
            setRepos(res.data);
        }).catch(e => {
            console.error(e.message);
            history.replace("/404");
        })

    }, []);

    if ( repos.length === 0 ) {
        return <div className="container text-center py-3">
            <Loader/>
        </div>
    }

    return (<CommunityPagination  items={repos.filter(repo => repo !== null)} itemsPerPage={5} />);
}


const mapStatetoProps = (state) => {
    return {
        accessToken: state.user.accessToken,
        user: state.user.instance.login
    }
}


export default connect(mapStatetoProps)(Community);
