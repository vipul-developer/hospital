import React from 'react';
import { Box,AppBar,Container,Toolbar,Typography,IconButton,Menu,MenuItem,Divider } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { pages,corporates } from "../../Misc/Menu";
const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setTimeout(() => {
            setAnchorElNav(null);
        },60000)
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const pagesNav = React.useMemo(() => {
        return pages.map((page) => (
            <Link to={page.linkTo} key={page._id} style={{margin:"20px 8px",display:'block',fontWeight:500,letterSpacing:".3px"}}>
                {page.name}
            </Link>
        ))
    },[])
    const corporatesNav = React.useMemo(() => {
        return corporates.map((page) => (
            <Link to={page.linkTo} key={page._id} style={{margin:page.name === "Login / Signup" ? "8px" : "22px 8px",display:'block',letterSpacing:".3px",fontSize:"14px",border:page.name === "Login / Signup" ? "1px solid #f0f0f5":"none",padding:page.name === "Login / Signup" ? "12px":"none",borderRadius:page.name === "Login / Signup" ? "5px":"none"}}>
                {page.name}
            </Link>
        ))
    },[])
    const pagesMemo = React.useMemo(() => {
        return pages.map((page) => (
            <Link to={page.linkTo} key={page._id}>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
            </Link>
        ))
    },[])
    const corporatesMemo = React.useMemo(() => {
        return corporates.map((page) => (
            <Link to={page.linkTo} key={page._id}>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
            </Link>
        ))
    },[])
    return (
        <AppBar position="fixed" elevation={0} sx={{color:"#2d2d32",backgroundColor:"#FFFFFF",borderBottom:"1px solid #f0f0f5"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="a" href="/" sx={{mr:2,fontWeight:700,letterSpacing:'.3rem',color:'inherit',textDecoration:'none',"&:hover":{color:'inherit',textDecoration:'none'},textTransform:"uppercase"}}>Netdott</Typography>
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
                            sx={{display:{xs:'block',md:'none'},"& .MuiPaper-elevation":{width:"100%",top:"71px !important"}}}
                        >
                            {pagesMemo}
                            <Divider sx={{my:1}}/>
                            {corporatesMemo}
                        </Menu>
                    </Box>
                    <Box sx={{display:{xs:'none',lg:'flex',},ml:3,flexGrow:1}}>
                        {pagesNav}
                    </Box>
                    <Box sx={{display:{xs:'none',md:'flex'},flexGrow:1,justifyContent:"end"}}>
                        {corporatesNav}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;