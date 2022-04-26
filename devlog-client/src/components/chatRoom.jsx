import { useEffect, useState } from 'react';
import { sendMessage } from '../features/discussionPages/action';
import store from './../app/store';
import { connect } from 'react-redux';


function ChatRoom({ messages, channelId, sectionId, sectionName, channelName }) {

    console.log(messages);

    useEffect(() => {
        console.log("Initital State for Chat room");
    }, []);

    const [message, setMessage] = useState("");

    const onSend = (e) => {
        e.preventDefault();
        if (message !== "") {
            const actionItem = sendMessage(sectionId, channelId, message);
            store.dispatch(actionItem);
        }
        setMessage("");
    }

    return <div style={{ height: "90vh" }} className="position-relative py-2 rounded border border-primary">
        <div className="px-1">
            <strong>{sectionName} / {channelName}</strong>
        </div>
        <div className="container-fluid px-1">
            {messages.map((e, index) =>
                (index % 2 == 0 ? <div className="text-end"><span className=" shadow-3 badge bg-primary text-white">{e}</span></div> : <div className="text-start"><span className="shadow-3 badge bg-light text-dark">{e}</span></div>)
            )}
        </div>

        <div className="position-absolute bottom-0 py-2 w-full">
            <div className="container-fluid px-1 d-flex">
                <input type="text" className="form-control" placeholder="Type message here!!" value={message} onChange={(e) => setMessage(e.target.value)} />
                <span className="btn btn-primary" onClick={(e) => onSend(e)} >send</span>
            </div>
        </div>
    </div>

}



const mapStateToProps = (state, props) => {

    const sectionId = state.discussions.currentSectionId;
    const channelId = state.discussions.currentChannelId;

    const sections = state.discussions.sections;

    const section = sections.find(s => s.id === sectionId);
    const channel = section.textChannels.find( c => c.id === channelId );

    return {
        messages : channel.messages,
        channelId : channelId,
        sectionId : sectionId,
        sectionName : section.name,
        channelName : channel.name
    }

}

export default connect(mapStateToProps)(ChatRoom);