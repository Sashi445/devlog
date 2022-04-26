import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RepoInfoComponent from './repoInfoComponent';
import { useLocation } from 'react-router-dom';

const RepoContent = () => {

    const location = useLocation();

    const state = location.state;

    const repo = state.repo;

    console.log(repo);

    useEffect(() => {
        console.log("init state!!");
    }, [])


    const { repoName, description, languages, repoRef } = repo;

    return (
        <div className='container py-2'>
            <div>
                <h3>{repoName}</h3>
                <p>{description ? description : "Description"}</p>
                <hr />
                <div className="">
                    <div className="row">
                        <div className="col-lg-10">
                            <RepoInfoComponent repoRef={repoRef} />
                        </div>
                        <div className="col-lg-2">
                            <div>
                                <h6>Languages</h6>
                                <div className='py-1'>
                                    {Object.keys(languages).map((e, index) => (<span key={index} className="badge bg-primary rounded me-1"  >{e}</span>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state, ownProps) => ({
    // props: ownProps
    // currentRepo :  ownProps.currentRepo,
    // posts : state.posts.posts.filter(e => e.repoRef === ownProps.currentRepo.repoRef)
})

export default connect(mapStateToProps)(RepoContent);
