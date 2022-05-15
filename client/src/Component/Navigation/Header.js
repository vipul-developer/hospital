import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box,AppBar,Toolbar,Typography,IconButton,Menu,MenuItem,Tooltip,Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SideDrawer from './SideDrawer';
import { settings } from "../../Misc/Menu";
const drawerWidth = 240;

const Header = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const handleDrawer = React.useCallback(() => {
        setOpen(prevCheck => !prevCheck);
    },[]);
    const handleOpenUserMenu = React.useCallback((event) => {
        setAnchorElUser(event.currentTarget);
    },[]);
    const handleCloseUserMenu = React.useCallback(() => {
        setAnchorElUser(null);
    },[]);
    return (
        <Box sx={{display:"flex"}}>
            <AppBar 
                position="fixed" 
                elevation={0}
                open={open}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open && {
                        marginLeft: drawerWidth,
                        width: `calc(100% - ${drawerWidth}px)`,
                        transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawer}
                        sx={{marginRight:3}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="a" href="/dashboard" sx={{flexGrow:1,fontFamily:'monospace',fontWeight:700,letterSpacing:'.3rem',color:'inherit',textDecoration:'none',"&:hover":{color:'inherit',textDecoration:'none'}}}>Netdott</Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ "& .MuiPaper-elevation":{top:"71px !important",width:"240px"} }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{vertical:'top',horizontal:'center',}}
                            keepMounted
                            transformOrigin={{vertical:'top',horizontal:'center',}}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting._id} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <SideDrawer open={open} drawerWidth={drawerWidth}>{props.children}</SideDrawer>
        </Box>
    );
};

export default Header;