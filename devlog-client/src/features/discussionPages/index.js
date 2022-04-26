import * as actionTypes from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

const initialIdSc = uuidv4();
const initialIdTc = uuidv4();
const initialIdVc = uuidv4();

const initialState = {
  currentSectionId: initialIdSc,
  currentChannelId: initialIdTc,
  currentVoiceChannelId: initialIdVc,
  sections: [
    {
      id: initialIdSc,
      name: "Basic",
      textChannels: [
        {
          type: "TEXT",
          id: initialIdTc,
          name: "General",
          messages: [],
        },
      ],
      voiceChannels: [
        {
          type: "VOICE",
          id: initialIdVc,
          name: "General",
        },
      ],
    },
  ],
};

function DiscussionsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SETCURRENTSECTION:
      state.currentSectionId = action.payload.sectionId;
      return { ...state };

    case actionTypes.SETCURRENTCHANNEL:
      state.currentChannelId = action.payload.channelId;
      return { ...state };

    case actionTypes.CREATESECTION:
      state.sections = [...state.sections, { ...action.payload }];
      return { ...state };

    case actionTypes.CREATETEXTCHANNEL:
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.sectionId) {
          section.textChannels = [
            ...section.textChannels,
            action.payload.textChannelData,
          ];
        }
        return {...section};
      });

      return { ...state };

    case actionTypes.CREATEVOICECHANNEL:
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.sectionId) {
          section.voiceChannels = [
            ...section.voiceChannels,
            action.payload.voiceChannelData,
          ];
        }
        return {...section};
      });

      return {...state};

    case actionTypes.DELETESECTION:
      return state;

    case actionTypes.POSTMESSAGE:
      const { sectionId, channelId, message } = action.payload;

      state.sections.map((section) => {
        if (section.id === sectionId) {
          section.textChannels.map((channel) => {
            if (channel.id === channelId) {
              channel.messages = [...channel.messages, message];
            }

            return channel;
          });
        }

        return section;
      });
      return { ...state };
    default:
      return state;
  }
}

export default DiscussionsReducer;
