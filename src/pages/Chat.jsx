/* eslint-disable react/prop-types */
// Home.js
import { IconButton, Skeleton, Stack } from '@mui/material';
import AppLayout from '../components/layout/AppLayout';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { grayColor, orange } from '../constants/color';
import { AttachFile  as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketsEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { TypingLoader } from '../components/layout/Loaders';
import { useNavigate } from 'react-router-dom';



// eslint-disable-next-line react-refresh/only-export-components
const Chat = ({chatId,user}) => {
  const containerRef=useRef(null)
  const socket=getSocket()
  const [message,setMessage]=useState("")
  const [messages,setMessages]=useState([])
  const [page,setPage]=useState(1)
  const[fileMenuAnchor,setFileMenuAnchor]=useState(null)
  const [IamTyping,setIamTyping]=useState(false)
  const [userTyping,setUserTyping]=useState(false)

  const typingTimeout=useRef(null)
  const bottomRef=useRef(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const chatDetails=useChatDetailsQuery({chatId,skip:!chatId})
  const oldMessagesChunk=useGetMessagesQuery({chatId,page})

  const {data:oldMessages,setData:setOldMessages}=useInfiniteScrollTop(containerRef,oldMessagesChunk.data?.totalPages,page,setPage,oldMessagesChunk.data?.messages)

  const errors=[{
    isError:chatDetails.isError,
    error:chatDetails.error
  },
  {
    isError:oldMessagesChunk.isError,
    error:oldMessagesChunk.error
  }]


  const members=chatDetails?.data?.chat?.members

  const messageOnChange=(e)=>{
    setMessage(e.target.value)
    if(!IamTyping){
      socket.emit(START_TYPING,{members,chatId})
      setIamTyping(true)
    }

    if(typingTimeout.current){
      clearTimeout(typingTimeout.current)
    }
    typingTimeout.current=setTimeout(()=>{
      socket.emit(STOP_TYPING,{members,chatId})
      setIamTyping(false)
    },[2000])
    
  }

  const handleFileOpen=(e)=>{
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    if(!message.trim()){
      return
    }
    
    //emitttin message to server
    socket.emit(NEW_MESSAGE,{
      chatId,
      members,
      message
    })
    setMessage("")
  }

  useEffect(()=>{
    if(!chatDetails.data?.chat){
      return navigate("/")
    }
  },[chatDetails.data])

  const newMessagesListener=useCallback((data)=>{
    if(data.chatId!==chatId){
      return;
    }
    setMessages((prev)=>[...prev,data.message])
  },[chatId])

  const startTypingListner=useCallback((data)=>{
    if(data.chatId!==chatId){
      return;
    }
    setUserTyping(true)
  },[chatId])

  const stopTypingListner=useCallback((data)=>{
    if(data.chatId!==chatId){
      return;
    }
    setUserTyping(false)
  },[chatId])

    useEffect(()=>{
      socket.emit(CHAT_JOINED,{
        userId:user._id,
        members
      })
      dispatch(removeNewMessagesAlert(chatId))
      
      return()=>{
        setMessages([]);
        setMessage("")
        setOldMessages([])
        setPage(1)
        socket.emit(CHAT_LEAVED,{
          userId:user._id,
          members
        })
      }
    },[chatId])

    useEffect(()=>{
      if(bottomRef.current){
        bottomRef.current.scrollIntoView({
          behaviour:"smooth"
        })
      }
    },[messages])

    const AlertListener=useCallback((content)=>{

      const messageForAlert={
        content,
        sender:{
          _id:"ojfodjs",
          name:"Admin"
        },
        chat:chatId,
        createdAt:new Date().toISOString(),
      }
      console.log(messageForAlert)
      setMessages((prev)=>[...prev,messageForAlert])
    },[chatId])


    
  const eventHandler={
    [ALERT]:AlertListener,
    [NEW_MESSAGE]:newMessagesListener,
    [START_TYPING]:startTypingListner,
    [STOP_TYPING]:stopTypingListner
  }

  useSocketsEvents(socket,eventHandler)

  useErrors(errors)
  
  const allMessages=[...oldMessages,...messages]


  return chatDetails.isLoading?(<Skeleton/>):(
    <Fragment>
      <Stack ref={containerRef}
      boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"} bgcolor={grayColor} height={"90%"} sx={{
        overflowX:"hidden",
        overflowY:"auto",
        
      }}>
      
        { 
          
          allMessages.map(i=>(
            <MessageComponent key={i._id} message={i} user={user}/>
          ))
        }


        {userTyping && <TypingLoader/>}
        <div ref={bottomRef}/>

        
      </Stack>

      <form style={{
        height:"10%"
      }}
      onSubmit={submitHandler}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton sx={{
            position:"absolute",
            left:"1.5rem",
            rotate:"30deg"
          }} 
            onClick={handleFileOpen}
          >
            <AttachFileIcon/>
          </IconButton>

          <InputBox placeholder='Start Typing Here.....' value={message}  onChange={messageOnChange}/>

          <IconButton type='submit' sx={{
            rotate:"-30deg",
            bgcolor:orange,
            color:"white",
            marginLeft:"1rem",
            padding:"0.5rem",
            "&:hover":{
              bgcolor:"error.dark"
            }

          }}>
            <SendIcon/>
            </IconButton>
        </Stack>
      </form>
      <FileMenu  anchorE1={fileMenuAnchor} chatId={chatId}/>
    </Fragment>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout(Chat);
 