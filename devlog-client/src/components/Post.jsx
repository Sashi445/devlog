import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import serverConfig from './../app/ServerConfig';
import { AiOutlineFileGif, AiOutlineFileImage, AiOutlineVideoCamera, AiFillCloseCircle } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { createPostAsync } from './../features/post/action';
import store from './../app/store';
import snackBarBtn from "../features/snackbar/action";


const PostBox = ({ accessToken, user }) => {

    const fileRef = useRef();

    const initialState = {
        postContent: "",
        repo: "",
        tags: [],
        tagName: "",
    }

    const [formState, setFormState] = useState(initialState);

    const [repos, setRepos] = useState(["None",]);

    const handleTextChange = (e) => {
        setFormState(state => ({
            ...state, postContent: e.target.value
        }))
    }

    const handleSelectChange = (e) => {
        setFormState(state => ({
            ...state, repo: e.target.value
        }))
    }

    const handleTagNameChange = (e) => {
        setFormState(state => ({
            ...state, tagName: e.target.value
        }))
    }

    const handleFileChange = (e) => {
        fileRef.current.click();
    }

    const handleTagSubmit = (e) => {
        
        if (e.key === "Enter") {
            e.preventDefault();
            if(formState.tagName.trim().length > 0){
                setFormState(state => ({
                    ...state, tags: [...state.tags, state.tagName],
                    tagName: ""
                }));
            }
            else{
                snackBarBtn("Tag name cannot be empty", "error");
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formState.postContent.trim().length > 0){
                const actionLoad = await createPostAsync(formState, accessToken, user.login);
                store.dispatch(actionLoad);
                setFormState(initialState);
                snackBarBtn("Posted", "success");
            }
            else{
                snackBarBtn("Post content cannot be empty", "error");
            }
        } catch (er) {
            setFormState(initialState);
            console.log(new Error(er.message));
        }
    }

    useEffect(() => {
        const url = serverConfig.proxyUrl;
        axios.get(`${url}/posts/repos/post/${user.login}`, {
            headers: serverConfig.getHeaders(accessToken),
        }).then(res => {
            const repoRespones = [{ id: 1, name: "None" }, ...res.data];
            setRepos(repoRespones);
        })
    }, [])

    const removeTag = (tag) => {
        setFormState(state => ({
            ...state, tags: state.tags.filter((t) => t !== tag)
        }));
    };

    return (<div className="card shadow-4 p-2">
        <textarea className="form-control p-1 border-bottom" rows="4" placeholder="What's Happening!!" value={formState.postContent} onChange={(e) => handleTextChange(e)} ></textarea>
        <div className="row align-items-center my-1">
            <div className="col-6">
                <input className="form-control p-2" type="text" placeholder="Tags" value={formState.tagName} onChange={(e) => handleTagNameChange(e)} onKeyDown={(e) => { handleTagSubmit(e) }} />
            </div>
            <div className="col-6">
                <div className="input-group">
                    <select className="form-control p-2" value={formState.repo} onChange={(e) => handleSelectChange(e)}>
                        {repos.map(repo => (<option selected={repo.name === "None" ? true : false}  key={repo.id} value={repo.id}>{repo.name}</option>))}
                    </select>
                </div>
            </div>
        </div>
        <div>
            {formState.tags.map(tag => (<span className="badge bg-primary mx-1">{tag}<AiFillCloseCircle role="button" onClick={() => removeTag(tag)} style={{ marginLeft: "5px", marginTop: "-2px" }} /></span>))}
        </div>
        <hr className="bg-secondary p-0 my-1" />
        <div className="d-flex justify-content-end my-1">
            {/* <div>
                <input type="file" className="d-none" ref={fileRef} />
                <AiOutlineFileImage size="25" cursor="pointer" onClick={(e) => handleFileChange(e)} />
                <AiOutlineVideoCamera size="25" cursor="pointer" />
                <AiOutlineFileGif size="25" cursor="pointer" />
            </div> */}
            {/* <BiSend cursor="pointer" size="30" onClick={(e) => handleSubmit(e)} className="p-1 rounded-circle bg-secondary" /> */}
            <button className="btn btn-sm btn-outline-primary" type="submit" onClick={(e) => handleSubmit(e)} >Post</button>
        </div>
    </div>);
}

const mapStatetoProps = (state) => {
    return {
        accessToken: state.user.accessToken,
        user: state.user.instance
    }
}

export default connect(mapStatetoProps)(PostBox);