// Home.js
import { Box, Typography } from '@mui/material';
import AppLayout from '../components/layout/AppLayout';
import { grayColor } from '../constants/color';

// eslint-disable-next-line react-refresh/only-export-components
const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} textAlign={"center"} variant='h5'>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppLayout(Home);
