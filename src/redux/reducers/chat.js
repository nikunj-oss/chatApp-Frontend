import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const NOTIFICATION_COUNT="notificationCount"
const initialNotificationCount = getOrSaveFromStorage({
  key: NOTIFICATION_COUNT,
  get: true
}) || 0;
const initialState = {
  
  notificationCount:initialNotificationCount,
  newMessagesAlert:getOrSaveFromStorage({
    key:NEW_MESSAGE_ALERT,
    get:true
  }) || [{
    chatId:"",
    count:0
  }]
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification:(state)=>{
      state.notificationCount+=1;
      getOrSaveFromStorage({
        key:NOTIFICATION_COUNT,
        value:state.notificationCount
      })
    },
    resetNotificationCount:(state)=>{
      state.notificationCount=0;
      getOrSaveFromStorage({
        key:NOTIFICATION_COUNT,
        value:state.notificationCount
      })
    },
    setNewMessagesAlert:(state,action)=>{
      const index = state.newMessagesAlert.findIndex((item) => item.chatId === action.payload.chatId);
      if(index!==-1){
        state.newMessagesAlert[index].count+=1;
      }
      else{
        state.newMessagesAlert.push({
          chatId:action.payload.chatId,
          count:1
        })   
      }
    },
    removeNewMessagesAlert:(state,action)=>{
      state.newMessagesAlert=state.newMessagesAlert.filter((item)=>item.chatId!==action.payload)
    },

  }
});

export const {incrementNotification,resetNotificationCount,setNewMessagesAlert,removeNewMessagesAlert
} = chatSlice.actions;

export default chatSlice;
