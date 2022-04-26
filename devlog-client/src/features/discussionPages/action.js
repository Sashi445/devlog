import * as actionTypes from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

const sectionTemplate = (sectionName) => ({
    id: uuidv4(),
    name: sectionName,
    textChannels: [
      {
        type: "TEXT",
        id: uuidv4(),
        name: "General",
        messages: [],
      },
    ],
    voiceChannels: [
      {
        type: "VOICE",
        id: 1,
        name: "General",
      },
    ],
  })

  const textChannelTemplate = (channelName) => ({
      type : "TEXT",
      id : uuidv4(),
      name : channelName,
      messages : []
  })

  const voiceChannelTemplate = (channelName) => ({
      type : "VOICE",
      id : uuidv4(),
      name :channelName
  })


export const setSection = (sectionId) => {
    return  {
        type : actionTypes.SETCURRENTSECTION,
        payload : { 
            sectionId
        }
    }
}

export const setChannel = (channelId) => {
    return  {
        type : actionTypes.SETCURRENTCHANNEL,
        payload : { 
            channelId
        }
    }
}

export const createSection = (sectionName) => {
  return {
    type: actionTypes.CREATESECTION,
    payload: sectionTemplate(sectionName),
  };
};

export const createTextChannel = (sectionId, channelName) => {
    return {
        type : actionTypes.CREATETEXTCHANNEL,
        payload : {
            sectionId : sectionId,
            textChannelData : textChannelTemplate(channelName) 
        }
    }
}

export const createVoiceChannel = (sectionId, channelName) => {
    return {
        type : actionTypes.CREATEVOICECHANNEL,
        payload : {
            sectionId,
            voiceChannelData : voiceChannelTemplate(channelName)
        }
    }
}

export const sendMessage = (sectionId, channelId, message) => {
    return  {
        type : actionTypes.POSTMESSAGE,
        payload : {
            sectionId,
            channelId,
            message
        }
    }
}
