import axios from "axios";
import { useState, useEffect } from "react";
import serverConfig from '../app/ServerConfig';
import { FaSearch } from "react-icons/fa";
import RepoListItem from './RepoListItem';
import { connect } from 'react-redux';

const Explore = ({ accessToken }) => {

    const [query, setQuery] = useState("");

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        if (query !== "") {
            axios.get(`${serverConfig.proxyUrl}/search/repos/${query}`, {
                headers: serverConfig.getHeaders(accessToken)
            })
                .then(res => {
                    console.log(res.data);
                    setRepos(res.data)
                }).catch(er => {
                    console.log(er.message);
                })
        } else {
            setRepos([]);
        }
    }, [query])

    return (
        <div className="container py-5">
            <div className="container mb-3">
                <div className="d-flex">
                    <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for communities (type repository names)" className="form-control" />
                    <div className="px-1"></div>
                    <button className="btn btn-sm btn-outline-success">
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="mb-2">
                    <strong>Search Results</strong>
                </div>
                <div className="results">
                    {repos.map(repo => <RepoListItem key={repo._id} repo={repo} />)}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    accessToken: state.user.accessToken
})

export default connect(mapStateToProps)(Explore);