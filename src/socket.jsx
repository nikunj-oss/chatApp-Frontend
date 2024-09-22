/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useMemo } from "react"
import io from "socket.io-client"
import { server } from "./constants/config";


const SocketContext=createContext();

const getSocket=()=>useContext(SocketContext)

// eslint-disable-next-line react/prop-types
const SocketProvider=({children})=>{
    const socket=useMemo(()=>
        io(server,{
            withCredentials:true, 
        })
    ,[])
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export {getSocket,SocketProvider}