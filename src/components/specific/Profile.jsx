/* eslint-disable react/prop-types */
import moment from 'moment';
import { Avatar, Stack, Typography } from "@mui/material";
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import {transformImage} from "../../lib/features.js"

const Profile = ({user}) => {
  return (
    <Stack spacing={2} direction="column" alignItems="center">
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: 2,
          border: "5px solid white",
        }}
      />
      <ProfileCard heading="Bio" text={user?.bio} />
      <ProfileCard heading="Username" text={user?.username} Icon={UserNameIcon} />
      <ProfileCard heading="Name" text={user?.name} Icon={FaceIcon} />
      <ProfileCard 
        heading="Joined" 
        text={moment(user?.createdAt).fromNow()} 
        Icon={CalendarIcon} 
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack direction="row" alignItems="center" spacing={1} color="white" textAlign="center">
    {Icon && <Icon />}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="gray" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
