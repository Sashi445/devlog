import React, { useState } from 'react';
import { createVoiceChannel, createTextChannel } from './../features/discussionPages/action';
import store from './../app/store';

const AddSectionModal = ({ sectionId, setModal }) => {

    const [type, setType] = useState("text");

    const [name, setName] = useState("");

    const handleSubmit = () => {

        console.log(sectionId);

        if (type !== "text") {
            store.dispatch(createVoiceChannel(sectionId, name))
        } else {
            store.dispatch(createTextChannel(sectionId, name))
        }
        setName("");
        setModal(false);

    }

    return (
        <div className="transparent modalClass" >
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                <div className='card p-2 shadow-4' >
                    <div className="card-body">
                        <div className="py-2">
                            <h3>Create Channel</h3>
                        </div>
                        <div className='mb-3' onChange={(e) => setType(e.target.value)}>
                            <div className='form-check'>
                                <input className='form-check-input' type="radio" name="channelType" value="text" id="tc" selected />
                                <label className='form-check-label' htmlFor="tc">Text</label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input' type="radio" name="channelType" value="voice" id="vc" />
                                <label className='form-check-label' htmlFor="vc">Voice</label>
                            </div>
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Enter channel name' className="form-control border border-dark" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="text-end">
                            <span className='btn btn-primary btn-sm' onClick={() => handleSubmit()}>Create</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSectionModal;