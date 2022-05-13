import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box,Container,Grid,Typography,Button,FormControl,TextField } from "@mui/material";
import LoginImage from "../../Resources/Images/Login/login.png";
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
const Login = () => {
    return (
        <>
            <Box sx={{display:"flex",bgcolor:"#f8fafb",mb:5,pb:5}}>
                <Container fixed sx={{mt:8}}>
                    <Grid container>
                        <Grid item xs={12} md={7}>
                            <img src={LoginImage} className="img-fluid" alt="Login Images"/>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{mt:10}}>
                            <Typography variant="h2" gutterBottom sx={{fontWeight:"lighter"}}>Welcome Back :&#41;</Typography>
                            <Typography className="text-muted" variant="subtitle1" gutterBottom component="div" sx={{mb:4}}>
                                To keep connected with us please login with your personal information by username and password <NotificationsSharpIcon fontSize="large" htmlColor="#ff9800"/>
                            </Typography>
                            <Box component="form" autoComplete="off" encType="multipart/form-data" onSubmit={() => {console.log("Form Submit")}}>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <TextField
                                        name="userName"
                                        id="userName"
                                        required
                                        type="text"
                                        label="User Name"
                                        value=""
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <TextField
                                        name="password"
                                        id="password"
                                        required
                                        type="password"
                                        label="Password"
                                        value=""
                                    />
                                </FormControl>
                                <Box sx={{display:"flex",justifyContent:"end"}}>
                                    <Typography className="text-muted" variant="subtitle1" gutterBottom component="div" sx={{mt:1}}><Link to={"/forget_password"}style={{textDecoration:"none",color:"inherit"}}>Forget Password ?</Link></Typography>
                                </Box>
                                <Button type="submit" variant="contained" size="large">Login</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Login;