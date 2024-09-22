/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, ListItem, Stack, Typography, Avatar, Button, Skeleton } from "@mui/material";
import { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const {isNotification}=useSelector((state)=>state.misc)
  const dispatch=useDispatch()


  const {isLoading,data,error,isError}=useGetNotificationsQuery()
  const [acceptRequest]=useAsyncMutation(useAcceptFriendRequestMutation)

  



  const friendRequestHandler = async ({ _id, accept }) => {
    // Handle friend request here
    dispatch(setIsNotification(false))
    await acceptRequest("accepting request..",{requestId:_id,accept})
    
  };

  const closeHandler=()=>{
    dispatch(setIsNotification(false))
  }
  useErrors([{error,isError}])
  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>
          Notifications
        </DialogTitle>

        {
          isLoading?<Skeleton/>:<>
            {
          data?.allRequest?.length > 0 ? (
            data?.allRequest?.map(({ sender, _id }) => (
              <NotificationItem sender={sender} _id={_id} key={_id} handler={friendRequestHandler} />
            ))
          ) : (
            <Typography textAlign={"center"}>No Notifications</Typography>
          )
        }
          </>
        }
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const {name,avatar}=sender
  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar}/>
        <Typography variant="body1" sx={{
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%"
        }}>{`${name} wants to be your friend`}</Typography>

        <Stack direction={{xs:"column",sm:"row"}}>
          <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
          <Button color="error" onClick={()=>handler({_id,accept:false})}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

// Set the display name for the memoized component
NotificationItem.displayName = "NotificationItem";

export default Notifications;
