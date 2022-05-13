import React from 'react';
import { Link } from 'react-router-dom';
import { Box,Container,Grid,Typography,Card,CardHeader,CardContent }  from "@mui/material";
import AccessDeniedImage from "../../Resources/Images/AccessDenied/NoPermission.png"
const AccessDenied = () => {
    return (
        <>
            <Box sx={{display:"flex",bgcolor:"#f6bdbe",height:"100vh"}}>
                <Container fixed>
                    <Grid container sx={{pt:8,pb:7,pl:5,pr:5,justifyContent:"center",alignItems:"center"}}>
                        <Grid item xs={12} md={10}>
                            <Card elevation={4} sx={{borderRadius:"20px"}}>
                                <CardHeader
                                    title="No Permission"
                                    sx={{"& .MuiCardHeader-title":{fontWeight:600,color:"#000"},textAlign:"center",mt:5}}
                                />
                                <CardContent sx={{textAlign:"center","& .MuiTypography-subtitle2":{fontSize:"18px",fontWeight:500,color:"#9e9e9e"},}}>
                                    <Typography variant="subtitle2" gutterBottom component="div">
                                        Sorry, but you don't have permission to access this page
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom component="div">
                                        You can go back to <Link to={"/"} style={{textDecoration:"none"}} >previous page</Link>
                                    </Typography>
                                </CardContent>
                                <img src={AccessDeniedImage} className="img-fluid" alt="Access Denied"/>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box> 
        </>
    );
};

export default AccessDenied;