/* eslint-disable react-hooks/rules-of-hooks */
import { Drawer, Grid, Skeleton } from "@mui/material";
import Title from "../shared/Title.jsx";
import Header from "./Header";
import ChatList from "../specific/ChatList.jsx";
import {useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc.js";
import {useErrors, useSocketsEvents} from "../../hooks/hook"
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features.js";
import DeleteChatMenu from "../dialogs/DeleteChatMenu.jsx";

const AppLayout = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // Hook call and other JavaScript code here
    const params = useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const chatId = params.chatId;

    const socket=getSocket();

    const [onlneUsers,setOnlineUsers]=useState([])

    const deleteMenuAnchor=useRef(null)


    const {isMobile}=useSelector(state=>state.misc)
    const {user}=useSelector(state=>state.auth)
    const {newMessagesAlert}=useSelector(state=>state.chat)
    const { isLoading, data, isError, error ,refetch} = useMyChatsQuery(""); // Use the correct hook

    useErrors([{isError,error}])

    useEffect(()=>{
      getOrSaveFromStorage({
        key:NEW_MESSAGE_ALERT,value:newMessagesAlert
      })
    },[newMessagesAlert])

    const handleDeleteChat=(e,chatId,groupChat)=>{
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({
        chatId,
        groupChat
      }))
      deleteMenuAnchor.current=e.currentTarget
    }
    const handleMobileClose=()=>dispatch(setIsMobile(false))


    const newMessageAlertListener=useCallback((data)=>{
      if(data.chatId===chatId){
        return
      }
      dispatch(setNewMessagesAlert(data))
    },[chatId])
    const newRequestListener=useCallback(()=>{
      dispatch(incrementNotification());

    },[dispatch])


    const refetchListener=useCallback(()=>{
      refetch()
      navigate("/")

    },[refetch,navigate])

    const onlineUsersListener=useCallback((data)=>{
      setOnlineUsers(data)
    },[])
  const eventHandlers={[NEW_MESSAGE_ALERT]:newMessageAlertListener,
    [NEW_REQUEST]:newRequestListener,
    [REFETCH_CHATS]:refetchListener,
    [ONLINE_USERS]:onlineUsersListener
  }


  useSocketsEvents(socket,eventHandlers)


    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}/>
        {
          isLoading?<Skeleton/>:(
            <Drawer open={isMobile} onClose={handleMobileClose}>  
              <ChatList w="70vw" chats={data?.chats} chatId={chatId}
                  
                  handleDeleteChat={handleDeleteChat} 
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlneUsers}
                    
               />
            </Drawer>
          )
        }
        
        <Grid container height={"calc(100vh - 4rem)"} sx={{ minHeight: "calc(100vh - 4rem)" }}>
          <Grid item sm={4} md={3} sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
          }} height={"100%"}>
              {
                isLoading?(<Skeleton/>):(<ChatList chats={data?.chats} chatId={chatId}
                  
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlneUsers}
                  
                />)
              }
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={6} sx={{ height: "100%" }}>
              <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid item md={4} lg={3} sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)"
          }}>
              <Profile user={user}/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
