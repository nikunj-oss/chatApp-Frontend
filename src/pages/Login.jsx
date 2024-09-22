import { Button, Container, IconButton, Paper, TextField, Typography, Avatar, Stack, Grid, Box, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { CameraAlt as Camera, Visibility, VisibilityOff } from "@mui/icons-material";
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation } from "6pp";
import { usernamevalidator } from '../utils/validators';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const[isLoading,setIsLoading]=useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = (formType) => {
    setIsLogin(formType === 'login');
    setShowPassword(false)
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernamevalidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch=useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId=toast.loading("Logging in....")
    setIsLoading(true)
    const config={withCredentials:true,
      headers:{
        'Content-Type':'application/json',
      }}
      try{
      console.log(username.value)
      console.log(password.value)
      const {data}=await axios.post(`${server}/api/v1/user/login`,{
        username:username.value,
        password:password.value,
      },config)
      dispatch(userExists(data.user))
      toast.success(data.message,{
        id:toastId
      })
    }
    catch(err){
      const errorMessage = typeof err.response?.data?.message === 'string' 
        ? err.response?.data?.message 
        : "Something Went Wrong";
      toast.error(errorMessage,{
        id:toastId
      });
    }
    finally{
      setIsLoading(false)
    }
    

  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const toastId=toast.loading("Signing up....")
    setIsLoading(true)
    const formData=new FormData();
    formData.append("avatar",avatar.file)
    formData.append("name",name.value)
    formData.append("bio",bio.value)
    formData.append("username",username.value)
    formData.append("password",password.value)
    const config={
      withCredentials:true,
      headers:{
        
        'Content-Type':'multipart/form-data',
        
      }
    }
    try{
      const {data}=await axios.post(`${server}/api/v1/user/new`,formData,config)
      dispatch(userExists(data.user))
      toast.success(data.message,{
        id:toastId
      })
    }
    catch(err){
      
      const errorMessage = err.response?.data?.message || "Something Went Wrong";
      toast.error(errorMessage,{
        id:toastId
      });
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      {/* Left Side - Login/Signup Form */}
      <Grid item xs={12} sm={6} style={{
        backgroundImage: "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "2rem",
      }}>
        {/* Toggle Buttons Positioned Outside the Form */}
        <Box sx={{
          position: "absolute",
          top: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}>
          <Button
            onClick={() => toggleForm('login')}
            sx={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "500",
              color: isLogin ? "white" : "#3f51b5",
              background: isLogin ? "#3f51b5" : "transparent",
              borderRadius: "30px",
              border: "2px solid #3f51b5",
              textTransform: "none",
              transition: "background 0.3s ease, color 0.3s ease",
              "&:hover": {
                background: isLogin ? "#303f9f" : "#e3f2fd",
                color: isLogin ? "white" : "#3f51b5",
              }
            }}
            disabled={isLoading}
            
          >
            Login
          </Button>
          <Button
            onClick={() => toggleForm('signup')}
            sx={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "500",
              color: !isLogin ? "white" : "#f50057",
              background: !isLogin ? "#f50057" : "transparent",
              borderRadius: "30px",
              border: "2px solid #f50057",
              textTransform: "none",
              transition: "background 0.3s ease, color 0.3s ease",
              "&:hover": {
                background: !isLogin ? "#c51162" : "#fce4ec",
                color: !isLogin ? "white" : "#f50057",
              }
            }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </Box>

        <Container component={"main"} maxWidth="xs" style={{ height: "auto", marginTop: "5rem" }}>
          <Paper elevation={4} sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}>
            {isLogin ? (
              <>
                <Typography variant='h4' gutterBottom sx={{ fontWeight: '600', marginBottom: '1rem' }}>Login</Typography>
                <form style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
                  onSubmit={handleLogin}
                  disabled={isLoading}
                >
                  <TextField required fullWidth label="Username" margin='normal' variant='outlined' sx={{ mb: 2 }} onChange={username.changeHandler} value={username.value} />
                  <TextField 
                    required 
                    fullWidth 
                    label="Password" 
                    type={showPassword ? 'text' : 'password'} 
                    margin='normal' 
                    variant='outlined' 
                    sx={{ mb: 2 }} 
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }} 
                    onChange={password.changeHandler}
                    value={password.value}
                  />
                  <Button sx={{ marginTop: "1rem", borderRadius: "30px" }} variant="contained" color="primary" type="submit" fullWidth>Login</Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant='h4' gutterBottom sx={{ fontWeight: '600', marginBottom: '1rem' }}>Sign Up</Typography>
                <form style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }} onSubmit={handleSignup}>
                  <Stack position={"relative"} width={"10rem"} margin={"auto"} mb={2}>
                    <Avatar sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      border: "2px solid #f50057"
                    }}
                      src={avatar.preview}
                    />
                    {avatar.error && (
                      <Typography m={"1rem"} width={"fit-content"} display={"block"} color={"error"} variant='caption'>
                        {avatar.error}
                      </Typography>
                    )}

                    <IconButton sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
                    }} component="label">
                      <>
                        <Camera />
                        <VisuallyHiddenInput type="file" accept='image/*' onChange={avatar.changeHandler} />
                      </>
                    </IconButton>
                  </Stack>
                  <TextField required fullWidth label="Name" margin='normal' variant='outlined' value={name.value} onChange={name.changeHandler} sx={{ mb: 2 }} />
                  <TextField required fullWidth label="Username" margin='normal' variant='outlined' value={username.value} onChange={username.changeHandler} sx={{ mb: 2 }} />
                  {username.error && (
                    <Typography color={"red"} variant='caption'>
                      {username.error}
                    </Typography>
                  )}
                  <TextField required fullWidth label="Bio" margin='normal' variant='outlined' value={bio.value} onChange={bio.changeHandler} sx={{ mb: 2 }} />
                  <TextField 
                    required 
                    fullWidth 
                    label="Password" 
                    type={showPassword ? 'text' : 'password'} 
                    margin='normal' 
                    variant='outlined' 
                    value={password.value} 
                    onChange={password.changeHandler} 
                    sx={{ mb: 2 }} 
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }} 
                  />
                  {password.error && (
                    <Typography color={"red"} variant='caption'>
                      {password.error}
                    </Typography>
                  )}
                  <Button sx={{ marginTop: "1rem", borderRadius: "30px" }} variant="contained" color="primary" type="submit" fullWidth disabled={isLoading}>Sign Up</Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </Grid>

      {/* Right Side - Logo or Additional Content */}
      <Grid item xs={12} sm={6} style={{
        backgroundImage: "linear-gradient(to bottom right, #000000, #434343)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "'Roboto', sans-serif",
      }}>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: '700', fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}>
            Welcome to Our Platform
          </Typography>
          <Typography variant="h6" component="p" sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, lineHeight: 1.6 }}>
            Join us today and elevate your learning experience.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
