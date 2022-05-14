import React from 'react';
import { Box,AppBar,Container,Toolbar,Typography,IconButton,Menu,MenuItem,Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { pages } from "../../Misc/Menu";
const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <AppBar position="fixed" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="a" href="/" sx={{mr:2,flexGrow:1,fontFamily:'monospace',fontWeight:700,letterSpacing:'.3rem',color:'inherit',textDecoration:'none',"&:hover":{color:'inherit',textDecoration:'none'}}}>Netdott</Typography>
                    <Box sx={{flexGrow:1,display:{ xs:'flex',md:'none'},justifyContent:"end"}}>
                        <IconButton
                            size="large"
                            aria-controls="navigation-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            edge="end"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
                            keepMounted
                            transformOrigin={{vertical: 'top',horizontal: 'left',}}
                            open={Boolean(anchorElNav)} 
                            onClose={handleCloseNavMenu} 
                            sx={{display:{xs:'block',md:'none'},"& .MuiPaper-elevation":{width:"100%",top:"58px !important"}}}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page._id} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <Typography variant="h6" noWrap component="a" href="/" sx={{mr:2,display: { xs: 'flex', md: 'none' },fontFamily: 'monospace',fontWeight:700,letterSpacing:'.3rem',color:'inherit',textDecoration:'none',"&:hover":{color:'inherit',textDecoration:'none'}}}>Netdott</Typography> */}
                    <Box sx={{ flexGrow:1,display:{xs:'none',md:'flex'},justifyContent:"end" }}>
                        {pages.map((page) => (
                            <Button
                                key={page._id}
                                onClick={handleCloseNavMenu}
                                sx={{ my:2,color:'white',display:'block'}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;