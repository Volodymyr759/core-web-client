import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IRoute, RouteNames } from '../../../routing';
import { Roles } from '../../../types/auth';
import { AppBar, Box, Button, Container, Toolbar, IconButton, Menu, MenuItem, Typography, Tooltip, Grid, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import BuildIcon from '@mui/icons-material/Build';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Groups2Icon from '@mui/icons-material/Groups2';
import AboutPage from '../../../pages/About/AboutPage';
import VacanciesPage from '../../../pages/Vacancies/VacanciesPage';
import ContactPage from '../../../pages/Contact/ContactPage';
import HomePage from '../../../pages/Home/HomePage';
import ServicesPage from '../../../pages/CompanyServices/ServicesPage';
import TeamPage from '../../../pages/Team/TeamPage';
import AppAvatar from '../AppAvatar/AppAvatar';

const mainMenuItems: { route: IRoute, icon: React.ReactNode }[] = [
    { route: { path: RouteNames.HOME, title: "Home", component: <HomePage /> }, icon: <HomeIcon sx={{ color: "#4b605c" }} /> },
    { route: { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> }, icon: <BrightnessAutoIcon sx={{ color: "#4b605c" }} /> },
    { route: { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> }, icon: <BuildIcon sx={{ color: "#4b605c" }} /> },
    { route: { path: RouteNames.TEAM, title: "Team", component: <TeamPage /> }, icon: <Groups2Icon sx={{ color: "#4b605c" }} /> },
    { route: { path: RouteNames.VACANCY, title: "Vacancies", component: <VacanciesPage /> }, icon: <Diversity3Icon sx={{ color: "#4b605c" }} /> },
    { route: { path: RouteNames.CONTACT, title: "Contact", component: <ContactPage /> }, icon: <ConnectWithoutContactIcon sx={{ color: "#4b605c" }} /> }
]

export default function MainAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const { auth } = useTypedSelector(state => state.auth)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#158F7C' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                            {mainMenuItems.map((page, index) => (
                                <MenuItem key={page.route.path} component={Link} to={page.route.path} onClick={handleCloseNavMenu}>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>{page.route.title}</Typography>
                                        {page.icon}
                                    </Grid>
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
                        {mainMenuItems.map((page) => (
                            <Button
                                key={page.route.path}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}
                            >
                                <Link to={page.route.path} className="main-menu-link">{page.route.title}</Link>
                            </Button>
                        ))}
                    </Box>

                    {/* Avatar */}
                    {auth ?
                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                            {
                                (auth.roles.includes(Roles.ADMIN) || auth.roles.includes(Roles.DEMO)) &&
                                <Link to={RouteNames.DASHBOARD} className="main-menu-link">
                                    <Tooltip title="Dashboard" placement="bottom">
                                        <DashboardIcon sx={{ color: 'white' }} />
                                    </Tooltip>
                                </Link>
                            }
                            <AppAvatar />
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
