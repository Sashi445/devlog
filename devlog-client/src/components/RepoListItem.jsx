import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineStar } from "react-icons/ai";
import { VscRepoForked } from "react-icons/vsc";
import { connect } from 'react-redux';

const RepoListItem = ({ repo }) => {

    const { repoName, description, languages, stargazers, forks } = repo;

    return (<Link to={{pathname : `/community/${repoName}`, state:{repo : repo}}} > 
        <div className="container mb-3">
            <div className="card shadow-3">
                <div className='card-body'>
                    <div>
                        <h5>{repoName !== null ? repoName : "RepoName"}</h5>
                        <p>{description !== null ? description : "Description"}</p>
                    </div>
                    <div>
                        { languages !== null ? Object.keys(languages).map((tag, index) => <span className='badge bg-primary rounded-pill me-1' key={index} > {tag ? tag : "Tag"} </span>) : <></> }
                    </div>
                    <hr />
                    <div className="d-flex align-items-center">
                        <div className="star-rating me-3">
                            <AiOutlineStar size={20} style={{ marginBottom: "3px" }} />
                            <span className="mx-1">{stargazers !== null ? stargazers : "7.5K"}</span>
                        </div>
                        <div>
                            <VscRepoForked style={{ marginBottom: "3px" }} />
                            <span className='mx-1'>{forks !== null ? forks : "35K"}</span>
                        </div>
                        <div className="flex-grow-1"></div>

                        {/* <div className="buttons">
                        <Link className='btn btn-outline-success'>Join</Link>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    </Link>);
}

RepoListItem.defaultProps = {
    repo: {
        repoName: "Repo Name",
        description: "Description",
        languages: [],
        forks: 0,
        stargazers: 0
    }
}

export default RepoListItem;