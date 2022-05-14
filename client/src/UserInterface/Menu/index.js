import React from 'react';
import { Menu,MenuItem,Typography } from "@mui/material";
const NavMenu = (props) => {
    console.log(props.anchorElNav)
    return (
        <Menu
            id={props.id}
            anchorEl={props.anchorElNav}
            anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            transformOrigin={{vertical: 'top',horizontal: 'left'}}
            keepMounted
            open={props.open}
            onClose={props.close}
            sx={props.style}
        >
            {
                props.page.map((menu,index) => (
                    <MenuItem key={menu._id} onClick={props.close}>
                        <Typography textAlign="center">{menu.name}</Typography>
                    </MenuItem>
                ))
            }
        </Menu>
    );
};

export default NavMenu;