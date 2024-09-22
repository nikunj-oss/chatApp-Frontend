/* eslint-disable react/prop-types */
import { Stack, Typography ,Box} from "@mui/material"
import { Link } from "../styles/StyledComponents"
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import {motion} from "framer-motion"

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat,
}) => {
  return (
    <Link sx={{
        padding:"0"
    }} to={`/chat/${_id}`} onContextMenu={(e)=>
        
        handleDeleteChat(e,_id,groupChat)
        
    }>
        <motion.div 
        initial={{
            opacity:0,
            y:"-100%"
        }}
        whileInView={{
            opacity:1,
            y:0
        }}
        transition={{
            delay:index * 0.1
        }}

        
        style={{
            display:"flex",
            gap:"1rem",
            alignItems:"center",
            padding:"1rem",
            cursor:"pointer",
            backgroundColor:sameSender?"black":"unset",
            color:sameSender?"white":"black",
            position:"relative"
        }}>
            <AvatarCard avatar={avatar}/>
            <Stack>
                <Typography>
                    {name}
                </Typography>
                
                {
                    newMessageAlert  && (
                        <Typography variant="body2" color={sameSender?"white":"black"}>
                        {newMessageAlert.count} New Message{newMessageAlert.count > 1 ? "s" : ""}
                        </Typography>
                    )
                }
            </Stack>

            {
                isOnline && <Box sx={{
                    position:"absolute",
                    right:"1rem",
                    width:"10px",
                    height:"10px",
                    borderRadius:"50%",
                    bgcolor:"green"
                }}/>
            }
        </motion.div>
    </Link>
  )
}

export default memo(ChatItem)