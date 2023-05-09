import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, Toolbar, Tooltip, IconButton, Menu, MenuItem, Typography, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import BuildIcon from '@mui/icons-material/Build';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Groups2Icon from '@mui/icons-material/Groups2';

import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { IRoute, RouteNames } from '../../../routing';
import AboutPage from '../../../pages/About/AboutPage';
import VacanciesPage from '../../../pages/Vacancies/VacanciesPage';
import ContactPage from '../../../pages/Contact/ContactPage';
import ChangeEmailPage from '../../../pages/Account/ChangeEmail/ChangeEmailPage';
import ChangePasswordPage from '../../../pages/Account/ChangePassword/ChangePasswordPage';
import HomePage from '../../../pages/Home/HomePage';
import ServicesPage from '../../../pages/CompanyServices/ServicesPage';
import TeamPage from '../../../pages/Team/TeamPage';
import ProfilePage from '../../../pages/Account/Profile/ProfilePage';
import FavoriteVacanciesPage from '../../../pages/Vacancies/FavoriteVacanciesPage';

const settings: IRoute[] = [
    { path: RouteNames.PROFILE, title: "Profile", component: <ProfilePage /> },
    { path: RouteNames.FAVORITE_VACANCIES, title: "Favorite Vacancies", component: <FavoriteVacanciesPage /> },
    { path: RouteNames.CHANGE_EMAIL, title: "Change email", component: <ChangeEmailPage /> },
    { path: RouteNames.CHANGE_PASSWORD, title: "Change password", component: <ChangePasswordPage /> }
];

const mainMenuRoutes: IRoute[] = [
    { path: RouteNames.HOME, title: "Home", component: <HomePage /> },
    { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> },
    { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> },
    { path: RouteNames.TEAM, title: "Team", component: <TeamPage /> },
    { path: RouteNames.VACANCY, title: "Vacancies", component: <VacanciesPage /> },
    { path: RouteNames.CONTACT, title: "Contact", component: <ContactPage /> }
]

const mainMenuIcons = [
    <HomeIcon sx={{ color: "#4b605c" }} />,
    <BrightnessAutoIcon sx={{ color: "#4b605c" }} />,
    <BuildIcon sx={{ color: "#4b605c" }} />,
    <Groups2Icon sx={{ color: "#4b605c" }} />,
    <Diversity3Icon sx={{ color: "#4b605c" }} />,
    <ConnectWithoutContactIcon sx={{ color: "#4b605c" }} />
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
        logout(auth.user.email, auth.tokens.accessToken);
        navigate(RouteNames.HOME);
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#158F7C' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography variant="h6" component="a" href="https://volodymyr759.github.io/core-web-client" sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontSize: '28px',
                        lineHeight: '1',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                        Shuffle
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
                            {mainMenuRoutes.map((page, index) => (
                                <MenuItem key={page.path} component={Link} to={page.path} onClick={handleCloseNavMenu}>
                                    {mainMenuIcons[index]}&nbsp;
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography variant="h6" component="a" href="https://volodymyr759.github.io/core-web-client" sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontSize: '28px',
                        lineHeight: '1',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                        Shuffle
                    </Typography>

                    {/* Main Menu pages */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {mainMenuRoutes.map((page) => (
                            <Button
                                key={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}
                            >
                                <Link to={page.path} className="main-menu-link">{page.title}</Link>
                            </Button>
                        ))}
                    </Box>

                    {/* Avatar */}
                    {auth ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Typography component="span">
                                {auth.user.userName + ' '}
                            </Typography>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                    <Avatar alt="Remy Sharp" src={auth.user.avatarUrl || "/static/images/avatar/2.jpg"} />
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
                            color="primary"
                            variant="contained"
                            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                        >
                            <Link to='/login' className="main-menu-link">Sign In</Link>
                        </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
