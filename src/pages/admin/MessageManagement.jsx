import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material"
import AdminLayout from "../../components/layout/AdminLayout"
import Table from "../../components/shared/Table"
import { useEffect, useState } from "react"
import { fileFormat, transformImage } from "../../lib/features"
import moment from "moment"
import RenderAttatchment from "../../components/shared/RenderAttachment"
import { useFetchData } from "6pp"
import { server } from "../../constants/config"
import { useErrors } from "../../hooks/hook"
const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200
},{
  field:"attatchments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
    const {attachments}=params.row

    return attachments.length>0?attachments.map((i)=>{
    const url=i.url
    const file=fileFormat(url)
    // eslint-disable-next-line react/jsx-key
    return <Box>
      <a href={url} download target="_blank" style={{
        color:"black"
      }}>
        {
          RenderAttatchment(file,url)
        }
      </a>
    </Box>

    }):<span>No Attachments</span>
  }
},
  {field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400,
  renderCell:(params)=>(
    params.row.content.length<=0?<Typography color={"error"} variant={"caption"}>No new Message</Typography>:params.row.content
  )

},
  

  {
    field:"sender",
    headerName:"Sent By",
    headerClassName:"table-header",
    width:200,
    renderCell:(params)=>(
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },

  {
    field:"chat",
    headerName:"Chat",
    headerClassName:"table-header",
    width:220
  },
  {
    field:"groupChat",
    headerName:"Group Chat",
    headerClassName:"table-header",
    width:100,
    renderCell:(params)=>(
      params.row.groupChat?<Typography color={"success"} variant={"caption"}>Yes</Typography>:<Typography color={"error"} variant={"caption"} >No</Typography>
    )
  },
  {
    field:"createdAt",
    headerName:"Time",
    headerClassName:"table-header",
    width:250,
    renderCell:(params)=>(
      moment(params.row.createdAt).format("MMMM Do YYYY,h:mm:ss a")
    )
  }
]
const MessageManagement = () => {
  const {loading,data,error}=useFetchData(`${server}/api/v1/admin/messages`,"dashboard-messages")
    useErrors([{
        isError:error,
        error:error
    }])
  const [rows,setRows]=useState([])

  useEffect(()=>{
    if(data){
      setRows(data.messages.map((i)=>(
        {...i,id:i._id,
          sender:{
            name:i.sender.name,
            avatar:transformImage(i.sender.avatar,50),
          }
        }
      )))
    }
  },[data])
  return (
    <AdminLayout>
      {
        loading?<Skeleton height={"100vh"}/>:<Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>

      }
    </AdminLayout>
  )
}

export default MessageManagement