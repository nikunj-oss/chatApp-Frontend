/* eslint-disable react/prop-types */
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { orange } from "../../constants/color";
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon,Logout as LogOutIcon,Notifications as NotifIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Suspense,lazy } from "react";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";
const Search=lazy(()=>import("../specific/Search"))
const Notification = lazy(() => import("../specific/Notifications"));
const NewGroup = lazy(() => import("../specific/NewGroup"));

// Define the IconBtn component within the same file
const IconBtn = ({ icon, onClick, title,value}) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {
          value?<Badge badgeContent={value} color="error">{icon}</Badge>:icon
        }
      </IconButton>
    </Tooltip>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const {isSearch,isNotification,isNewGroup} =useSelector(state=>state.misc)
  const {notificationCount} =useSelector(state=>state.chat)


  
  const handleMobile = () => {
    dispatch(setIsMobile(true))
  };

  const openSearch = () => {
    dispatch(setIsSearch(true))
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true))
  };

  const openNotification = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotificationCount())
  };

  const LogOut = async () => {
   try{
    const {data}=await axios.get(`${server}/api/v1/user/logout`,{
      withCredentials:true
    })
    dispatch(userNotExists())
    toast.success(data.message)

   }
   catch(err){
    toast.error(err?.response?.data?.message || "Something Went Wrong")
   }
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block"
                }
              }}
            >
              Sync
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "none"
                }
              }}
            >
              <IconBtn icon={<MenuIcon />} onClick={handleMobile} title="Menu" />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn icon={<SearchIcon />} onClick={openSearch} title="Search" />
              <IconBtn icon={<AddIcon />} onClick={openNewGroup} title="New Group" />
              <IconBtn icon={<GroupIcon />} onClick={navigateToGroup} title="Manage Group" />
              <IconBtn icon={<NotifIcon />} onClick={openNotification} title="Notification" value={notificationCount} />
              <IconBtn icon={<LogOutIcon />} onClick={LogOut} title="Logout" />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <Search />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <NewGroup />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <Notification />
        </Suspense>
      )}
    </>
  );
};

export default Header;
