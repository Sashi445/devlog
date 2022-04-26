import React, { useState } from 'react';
import RepoContent from './repoContent';

const RepoHandler = ({ repos }) => {

    const [selected, setSelected] = useState(repos[0]);

    console.log("Inside repo handler : ", repos);

    return (
        <div className="container py-3">
            <div className="row">
                <div className="col-lg-3 col-md-4 col">
                    <ul className="list-group">
                        {
                            repos.map((repo) => {

                                if (repo !== null) {

                                    const { repoName } = repo;

                                    return (
                                        <li className="list-group-item cursor-pointer" onClick={() => setSelected(repo)}>{repoName} Hello</li>
                                    )
                                
                                }

                                return <></>

                            })
                        }
                    </ul>
                </div>
                <div className="col-lg-9 col-md-8 col">
                    <RepoContent currentRepo={selected} />
                </div>
            </div>
        </div>
    )
}

export default RepoHandler
