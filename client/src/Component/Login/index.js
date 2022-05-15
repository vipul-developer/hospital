import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { Box,Container,Grid,Typography,Button,FormControl,TextField,InputAdornment,IconButton } from "@mui/material";
import LoginImage from "../../Resources/Images/Login/login.png";
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from "../../Redux/Action/User";
const Login = () => {
    const [ showPassword,setShowPassword ] = React.useState(false);
    const [ message,setMessage ] = React.useState("");
    const [ values, setValues ] = React.useState({
        userName:"",
        password:""
    });
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleChange = React.useCallback((e,v) => {
        setValues({ ...values, [v]: e.target.value })
        // console.log(e.target.value)
    },[values]);
    const handleClickShowPassword = React.useCallback(() => {
        setShowPassword(prevCheck => !prevCheck);
    },[]);

    const handleSubmit = React.useCallback((event) => {
        event.preventDefault();
        dispatch(login(values)).then((response) => {
            if(response.payload.loginSuccess){
                setMessage(response.payload.message);
                navigate("/dashboard",{replace:true});
            }else{
                setMessage(response.payload.message);
                navigate("/login",{replace:true});
            }
        }).catch((err) => {console.log(err)})
    },[dispatch,navigate,values]);
    const handleValidForm = React.useMemo(() => {
        return values.userName.length > 8 && values.password.length > 11;
    },[values])
    return (
        <>
            <Box sx={{display:"flex",bgcolor:"#f8fafb",overflow:"hidden"}}>
                <Container fixed>
                    <Grid container sx={{py:10}}>
                        <Grid item xs={12} md={7}>
                            <img src={LoginImage} className="img-fluid" alt="Login Images"/>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{mt:10,pb:5}}>
                            <Typography variant="h2" gutterBottom sx={{fontWeight:"lighter"}}>Welcome Back :&#41;</Typography>
                            <Typography className="text-muted" variant="subtitle1" gutterBottom component="div" sx={{mb:4}}>
                                To keep connected with us please login with your personal information by username and password <NotificationsSharpIcon fontSize="large" htmlColor="#ff9800"/>
                            </Typography>
                            <Box component="form" autoComplete="off" encType="multipart/form-data" onSubmit={(event) => handleSubmit(event)}>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <TextField
                                        name="userName"
                                        id="userName"
                                        required
                                        type="text"
                                        label="User Name"
                                        value={values.userName || ""}
                                        onChange={(e) => handleChange(e,"userName")}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <TextField
                                        name="password"
                                        id="password"
                                        required
                                        type={showPassword ? "text":"password"}
                                        label="Password"
                                        value={values.password || ""}
                                        onChange={(e) => handleChange(e,"password")}
                                        helperText={message}
                                        sx={{"& .MuiFormHelperText-root":{color:"#d32f2f"}}}
                                        InputProps={{
                                            endAdornment:(
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </FormControl>
                                <Box sx={{display:"flex",justifyContent:"end"}}>
                                    <Typography className="text-muted" variant="subtitle1" gutterBottom component="div" sx={{my:1}}><Link to={"/forget_password"}style={{textDecoration:"none",color:"inherit"}}>Forget Password ?</Link></Typography>
                                </Box>
                                <Button type='submit' variant="contained" size="large" disabled={!handleValidForm}>Login</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Login;