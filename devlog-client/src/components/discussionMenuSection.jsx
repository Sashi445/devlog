import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setChannel } from '../features/discussionPages/action';
import store from './../app/store';
import { setSection } from './../features/discussionPages/action';
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { MdModeEditOutline, MdOutlineDelete } from "react-icons/md";

const DiscussionMenuSection = ({ setModal, setCurrSection, sectionData, currentChannelId, currentSectionId }) => {

    const [open, setOpen] = useState(true);

    const { textChannels, voiceChannels, name } = sectionData;

    const handleAddMenuSectionClick = () => {
        setCurrSection(sectionData.id)
        setModal(true);
    } 

    const handleClick = (sectionId, channelId) => {
        console.log(sectionId, channelId);
        onClicksetSectionId(sectionId);
        onClicksetChannelId(channelId);
    }

    const onClicksetSectionId = (id) => {
        console.log(id);
        const actionLoad = setSection(id);
        store.dispatch(actionLoad);
    }

    const onClicksetChannelId = (id) => {
        console.log(id);
        const actionLoad = setChannel(id);
        store.dispatch(actionLoad);
    }

    return (<div>
        <div className="container-fluid mb-3">
            <div className="top-section d-flex">
                <div className="arrow cursor-pointer" onClick={() => setOpen(!open)}>
                    <strong style={{ marginBottom: "3px" }}>{open ? <BsChevronDown /> : <BsChevronRight />}</strong>
                </div><div className="px-2 flex-grow-1">
                    <strong>{name}</strong>
                </div>
                <div className="cursor-pointer" onClick={() => handleAddMenuSectionClick() }>
                    <span className="badge bg-primary"> + </span>
                </div>
            </div>
            <div className="channels container-fluid"  >
                {open ? <>
                    <p>Text Channels</p>

                    <div className="px-2">
                        {textChannels.map(tc => <div className={(currentChannelId === tc.id && currentSectionId === sectionData.id) ? "border border-2 border-primary rounded" : ""} onClick={(e) => handleClick(sectionData.id, tc.id)} key={tc.id}>
                            <div className="d-flex align-items-center p-1">
                                <div className="flex-grow-1">
                                    {tc.name}
                                </div>
                                <MdModeEditOutline />
                                <MdOutlineDelete />
                            </div>
                        </div>
                        )}
                    </div>

                    <p>Voice Channels</p>

                    {voiceChannels.map(vc => <div onClick={(e) => handleClick(sectionData.id, vc.id)} key={vc.id}>
                        <div className="d-flex align-items-center p-1">
                            <div className="flex-grow-1">
                                {vc.name}
                            </div>
                            <MdModeEditOutline />
                            <MdOutlineDelete />
                        </div>
                    </div>
                    )}

                </> : <></>}
            </div>
        </div>
    </div>);
}

const mapStateToProps = (state, props) => {

    const currentSId = state.discussions.currentSectionId;
    const currentCId = state.discussions.currentChannelId;

    const id = props.sectionId
    const section = state.discussions.sections.find(s => s.id === id);

    return {
        setModal : props.setModal,
        setCurrSection : props.setCurrSection,
        sectionData: section,
        currentChannelId: currentCId,
        currentSectionId: currentSId
    }

}

export default connect(mapStateToProps)(DiscussionMenuSection);