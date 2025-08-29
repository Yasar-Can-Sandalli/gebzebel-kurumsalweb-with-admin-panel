import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import "./NavBar2.css";
const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Logo or Brand Name */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src={"./images/logo.png"} alt={"LOGO"} id="logo" />
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" onClick={handleMenuClose}>
                        Home
                    </Button>
                    <Button color="inherit" onClick={handleMenuClose}>
                        About
                    </Button>
                    <Button color="inherit" onClick={handleMenuClose}>
                        Services
                    </Button>
                    <Button color="inherit" onClick={handleMenuClose}>
                        Contact
                    </Button>
                </Box>

                {/* Mobile Menu Icon */}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                    <MenuItem onClick={handleMenuClose}>About</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Services</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;