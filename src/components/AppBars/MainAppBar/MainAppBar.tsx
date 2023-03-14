import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, Toolbar, Tooltip, IconButton, Menu, MenuItem, Typography, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { IRoute, RouteNames } from '../../../routing';
import AboutPage from '../../../pages/AboutPage/AboutPage';
import VacanciesPage from '../../../pages/Vacancies/VacanciesPage';
import ContactPage from '../../../pages/ContactPage/ContactPage';
import HomePage from '../../../pages/HomePage/HomePage';
import ServicesPage from '../../../pages/CompanyServices/ServicesPage';
import TeamPage from '../../../pages/TeamPage/TeamPage';

const settings: IRoute[] = [
    { path: RouteNames.HOME, title: "Home", component: <HomePage /> },
    { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> },
    { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> }
];

const mainMenuRoutes: IRoute[] = [
    { path: RouteNames.HOME, title: "Home", component: <HomePage /> },
    { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> },
    { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> },
    { path: RouteNames.TEAM, title: "Team", component: <TeamPage /> },
    { path: RouteNames.VACANCY, title: "Vacancies", component: <VacanciesPage /> },
    { path: RouteNames.CONTACT, title: "Contact", component: <ContactPage /> }
]

export default function MainAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions();
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout(auth.email, auth.tokens.accessToken);
        navigate(RouteNames.HOME);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap component="a" href="/" sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                        LOGO
                    </Typography>

                    {/* Hiden menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            {mainMenuRoutes.map((page) => (
                                <MenuItem key={page.path} component={Link} to={page.path} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Main Menu pages */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {mainMenuRoutes.map((page) => (
                            <Button
                                key={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                            >
                                <Link to={page.path} className="main-menu-link">{page.title}</Link>
                            </Button>
                        ))}
                    </Box>

                    {/* Avatar */}
                    {auth ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting.path} component={Link} to={setting.path} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                ))}
                                <hr />
                                <MenuItem component={Link} to={RouteNames.HOME} onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        :
                        <Button
                            onClick={handleCloseNavMenu}
                            color="secondary"
                            variant="contained"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to='/login' className="main-menu-link">Sign in</Link>
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
