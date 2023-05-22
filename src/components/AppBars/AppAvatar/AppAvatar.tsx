import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { IRoute, RouteNames } from '../../../routing';
import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfilePage from '../../../pages/Account/Profile/ProfilePage';
import ChangeEmailPage from '../../../pages/Account/ChangeEmail/ChangeEmailPage';
import FavoriteVacanciesPage from '../../../pages/Vacancies/FavoriteVacanciesPage';
import ChangePasswordPage from '../../../pages/Account/ChangePassword/ChangePasswordPage';

export default function AppAvatar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions();
    const navigate = useNavigate();

    const settings: { route: IRoute, icon: React.ReactNode }[] = [
        { route: { path: RouteNames.PROFILE, title: "Profile", component: <ProfilePage /> }, icon: <AccountCircleIcon sx={{ color: "#4b605c" }} /> },
        { route: { path: RouteNames.FAVORITE_VACANCIES, title: "Favorite Vacancies", component: <FavoriteVacanciesPage /> }, icon: <FavoriteIcon sx={{ color: "#4b605c" }} /> },
        { route: { path: RouteNames.CHANGE_EMAIL, title: "Change email", component: <ChangeEmailPage /> }, icon: <MailOutlineIcon sx={{ color: "#4b605c" }} /> },
        { route: { path: RouteNames.CHANGE_PASSWORD, title: "Change password", component: <ChangePasswordPage /> }, icon: <PasswordIcon sx={{ color: "#4b605c" }} /> }
    ];

    const handleLogout = () => {
        logout(auth.user.email, auth.tokens.accessToken);
        navigate(RouteNames.HOME);
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Manage profile">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar alt="Avatar" src={auth.user.avatarUrl || "https://volodymyr57.somee.com/uploads/admin-avatar.jpg"} />
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
                onClose={handleClose}
            >
                <Box sx={{ margin: "5px 15px" }}>
                    <Typography component={'p'} sx={{ fontSize: '0.75rem;', fontWeight: '600' }}>{auth.user.userName}</Typography>
                    <Typography component={'p'} sx={{ fontSize: '0.75rem;', fontWeight: 'normal' }}>{"Roles: " + auth.roles.join(", ")}</Typography>
                </Box>
                <hr style={{ width: "90%" }} />
                {settings.map((setting, index) => (
                    <MenuItem key={setting.route.path} component={Link} to={setting.route.path} onClick={handleClose}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                            <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>{setting.route.title}</Typography>
                            {setting.icon}
                        </Grid>
                    </MenuItem>
                ))}
                <hr style={{ width: "90%" }} />
                <MenuItem component={Link} to={RouteNames.HOME} onClick={handleLogout}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Logout</Typography>
                        <LogoutIcon sx={{ color: "red" }} />
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
