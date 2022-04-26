import React, { useState, useEffect } from 'react';
import { createSection } from './../features/discussionPages/action';
import store from './../app/store';
import ChatRoom from './chatRoom';
import { connect } from 'react-redux';
import DiscussionMenuSection from './discussionMenuSection';
import AddSectionModal from './AddSectionModal';


const DiscussionPage = ({ sections, currentChannelId, currentSectionId }) => {

    const [ modal, setModal ] = useState(false);

    const [ currSection, setCurrSection ] = useState(null);

    const onClickCreateSection = () => {
        console.log("Clicked Create Section")
        const actionLoad = createSection("Default Section Name");
        console.log(actionLoad)
        store.dispatch(actionLoad);
    }

    return <div className="container p-1">
        { modal ? <AddSectionModal sectionId={currSection} setModal={setModal} /> : <></> }
        <div className="row">
            <div className="col-md-4 border border-primary py-2 rounded">
                <div className='d-flex flex-column'>
                    <div className="mb-2 px-1">
                        <h4>Discussion Rooms</h4>
                    </div>
                    <div>
                        {sections.map(s => <DiscussionMenuSection key={s.id} sectionId={s.id} setModal={setModal} setCurrSection={setCurrSection} />)}
                    </div>
                    <button className="btn btn-sm btn-primary" onClick={() => onClickCreateSection()}>Create Section</button>
                </div>
            </div>
            <div className="col-md-8">
                <ChatRoom sectionId={currentSectionId} channelId={currentChannelId} />
            </div>
        </div>
    </div>;
}

const mapStateToProps = (state) => ({
    sections: state.discussions.sections,
    currentSectionId: state.discussions.currentSectionId,
    currentChannelId: state.discussions.currentChannelId
})

export default connect(mapStateToProps)(DiscussionPage);