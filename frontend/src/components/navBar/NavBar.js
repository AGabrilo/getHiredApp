import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Typography, AppBar, Box, Toolbar, IconButton, Menu, MenuItem, Container, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate()
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name')
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("name")
        handleCloseUserMenu()
        navigate('/')

    }

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#0d1a30', boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.3rem',
                            color: '#fafafa',
                            textDecoration: 'none',
                        }}
                    >
                        GetHired
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key='jobs' onClick={handleCloseNavMenu}>
                                <Link to='/jobs'><Typography textAlign="center">Jobs</Typography></Link>
                            </MenuItem>
                            <MenuItem key='companies' onClick={handleCloseNavMenu}>
                                <Link to='/companies'> <Typography textAlign="center">Companies</Typography> </Link>
                            </MenuItem>
                            {role === 'user' ?
                                <>
                                    <MenuItem key='myapplications' onClick={handleCloseNavMenu}>
                                        <Link to='/myapplications'><Typography textAlign="center">My applications</Typography></Link>
                                    </MenuItem>
                                    <MenuItem key='favourites' onClick={handleCloseNavMenu}>
                                        <Link to='/favourites'><Typography textAlign="center">Favourites</Typography></Link>
                                    </MenuItem>
                                </>
                                : null
                            }
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '.3rem',
                            color: '#fafafa',
                            textDecoration: 'none',
                        }}
                    >
                        GetHired
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {role === 'user' || role === 'company' ?
                            <>
                                <Link to='/jobs'>
                                    <Button
                                        key='jobs2'
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                                    >
                                        Jobs
                                    </Button>
                                </Link>

                                <Link to='/companies'><Button
                                    key='companies2'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                                >
                                    Companies
                                </Button></Link>
                                <Link to='/myapplications'><Button
                                    key='myapplications2'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                                >
                                    My Applications
                                </Button></Link>
                            </>
                            : null}

                        {role === 'user' ?
                            <Link to='/favourites'><Button
                                key='favourites2'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                            >
                                Favourites
                            </Button></Link>
                            : null}

                        {role === 'company' ?
                            <Link to='/myJobs'><Button
                                key='myjobs'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                            >
                                My jobs
                            </Button></Link>
                            : null}
                        {role === 'admin' ?
                            <>
                                <Link to='/students'><Button
                                    key='students'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                                >
                                    Students
                                </Button></Link>
                                <Link to='/companiesTable'><Button
                                    key='companiesTable'
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#fafafa', display: 'block', fontSize: '22px' }}
                                >
                                    Companies
                                </Button></Link>
                            </>
                            : null}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {name ?
                            <Tooltip title="Open settings" sx={{ w: 30, h: 30 }}>
                                <IconButton> <NotificationsIcon sx={{ color: 'white' }} /></IconButton>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                                    <Typography sx={{ color: 'white' }}>{name}</Typography>
                                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                </IconButton>

                            </Tooltip>
                            :
                            <Button onClick={() => navigate("/login")} sx={{ backgroundColor: '#f2572c', color: '#fafafa' }}> Sign in</Button>
                        }
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='profile' onClick={() => { navigate('myprofile'); handleCloseUserMenu() }}>
                                <Typography textAlign="center">My profile</Typography>
                            </MenuItem>
                            <MenuItem key='logout' onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;