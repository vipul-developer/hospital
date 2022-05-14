import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box,Drawer,ListItemButton,ListItemText } from "@mui/material";

const SideDrawer = (props) => {
    const theme = useTheme();
    const openedMixin = (theme) => ({
        width: props.drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });
      
    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
      
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <>
            <Drawer 
                variant="permanent" 
                open={props.open}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    width: props.drawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    ...(props.open && {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                    }),
                    ...(!props.open && {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                    }),
                }}
            >
                <DrawerHeader/>
                <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </Drawer>  
            <Box component="main" sx={{flexGrow:1,p:3}}>
                {props.children}
            </Box>
        </>
    );
};

export default SideDrawer;