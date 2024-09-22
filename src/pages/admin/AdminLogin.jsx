import React, { useEffect } from 'react';
import { Button, Container, Paper, TextField, Typography, Grid, Box, IconButton, InputAdornment } from '@mui/material';
import { useInputValidation } from "6pp";
import { Navigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux"
import { adminLogin, getAdmin } from '../../redux/thunks/admin';

const AdminLogin = () => {
  const {isAdmin}=useSelector(state=>state.auth)
  const secretKey = useInputValidation("");
  const dispatch=useDispatch()

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle login logic here
    dispatch(adminLogin(secretKey.value))
  }
  useEffect(()=>{
    dispatch(getAdmin())
  },[dispatch])
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />
  }

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      {/* Left Side - Login Form */}
      <Grid item xs={12} sm={6} style={{
        backgroundImage: "linear-gradient(135deg, #f9f9f9, #e0e0e0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "2rem",
      }}>
        <Container component={"main"} maxWidth="xs" style={{ marginTop: "5rem" }}>
          <Paper elevation={6} sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            backgroundColor: "#ffffff",
          }}>
            <Typography variant='h4' gutterBottom sx={{ fontWeight: '600', marginBottom: '1.5rem', color: "#3f51b5" }}>
              Admin Login
            </Typography>
            <form style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }} onSubmit={submitHandler}>
              <TextField 
                required 
                fullWidth 
                label="Secret Key" 
                type={passwordVisible ? 'text' : 'password'} 
                margin='normal' 
                variant='outlined' 
                sx={{ 
                  mb: 2, 
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#3f51b5',
                    },
                    '&:hover fieldset': {
                      borderColor: '#303f9f',
                    },
                  },
                }} 
                value={secretKey.value} 
                onChange={secretKey.changeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                      >
                        {passwordVisible ? <Visibility /> : <VisibilityOff/> }
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button sx={{
                marginTop: "1.5rem",
                borderRadius: "30px",
                padding: "0.75rem 2rem",
                backgroundImage: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                '&:hover': {
                  backgroundImage: "linear-gradient(90deg, #303f9f, #5c6bc0)",
                }
              }} variant="contained" color="primary" type="submit" fullWidth>
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Grid>

      {/* Right Side - Logo or Additional Content */}
      <Grid item xs={12} sm={6} style={{
        backgroundImage: "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "'Roboto', sans-serif",
      }}>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom sx={{
            fontWeight: '700',
            fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
            textShadow: "2px 4px 6px rgba(0,0,0,0.3)",
          }}>
            Welcome to Our Platform
          </Typography>
          <Typography variant="h5" sx={{
            mb: 4,
            fontSize: { xs: "1.2rem", sm: "1.7rem", md: "2.2rem" },
            textShadow: "1px 2px 4px rgba(0,0,0,0.3)",
          }}>
            Enhance your learning experience
          </Typography>
          {/* Add your logo or any other content here */}
        </Box>
      </Grid>
    </Grid>
  )
}

export default AdminLogin;
