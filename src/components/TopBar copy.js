import React from 'react'
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Button,
    IconButton,
    Tooltip,
    Menu,
    Avatar,
    MenuItem,
    Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router-dom'
import UserSession from '../pages/Home/services/auth'

const pages = [
    {
        label: 'Products',
        route: '/products',
    },
    {
        label: 'Pricing',
        route: '/pricing',
    },
    {
        label: 'Blog',
        route: '/blog',
    },
]

const TopBar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] =
        (React.useState < null) | (HTMLElement > null)
    const [anchorElUser, setAnchorElUser] =
        (React.useState < null) | (HTMLElement > null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YOUR APP NAME
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
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
                            {UserSession.isAuthenticated() &&
                                pages.map((page, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            navigate(page.route)
                                            handleCloseNavMenu
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YOUR APP NAME
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {UserSession.isAuthenticated() &&
                            pages.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={() => {
                                        navigate(page.route)
                                        handleCloseNavMenu
                                    }}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                    </Box>

                    {UserSession.isAuthenticated() ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="Remy Sharp" />
                                </IconButton>
                            </Tooltip>
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
                                <MenuItem
                                    onClick={() => {
                                        navigate('/profile')
                                        handleCloseUserMenu()
                                    }}
                                >
                                    <Typography textAlign="center">
                                        Profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        Account
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        Dashboard
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        UserSession.removeUser()
                                        navigate('/signin')
                                        handleCloseUserMenu()
                                    }}
                                >
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : location.pathname === '/signup' ? (
                        <Button
                            key="Login"
                            onClick={() => navigate('/signin')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            key="Signup"
                            onClick={() => navigate('/signup')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sign Up
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default TopBar
