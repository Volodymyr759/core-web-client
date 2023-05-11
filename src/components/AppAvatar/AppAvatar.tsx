import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { IRoute, RouteNames } from '../../routing';
import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfilePage from '../../pages/Account/Profile/ProfilePage';
import ChangeEmailPage from '../../pages/Account/ChangeEmail/ChangeEmailPage';
import FavoriteVacanciesPage from '../../pages/Vacancies/FavoriteVacanciesPage';
import ChangePasswordPage from '../../pages/Account/ChangePassword/ChangePasswordPage';

export default function AppAvatar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { auth } = useTypedSelector(state => state.auth)
    const { logout } = useActions();
    const navigate = useNavigate();

    const settings: IRoute[] = [
        { path: RouteNames.PROFILE, title: "Profile", component: <ProfilePage /> },
        { path: RouteNames.FAVORITE_VACANCIES, title: "Favorite Vacancies", component: <FavoriteVacanciesPage /> },
        { path: RouteNames.CHANGE_EMAIL, title: "Change email", component: <ChangeEmailPage /> },
        { path: RouteNames.CHANGE_PASSWORD, title: "Change password", component: <ChangePasswordPage /> }
    ];

    const settingsIcons = [
        <AccountCircleIcon sx={{ color: "#4b605c" }} />,
        <FavoriteIcon sx={{ color: "#4b605c" }} />,
        <MailOutlineIcon sx={{ color: "#4b605c" }} />,
        <PasswordIcon sx={{ color: "#4b605c" }} />
    ]

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
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', columnGap: '10px' }}>
            <Typography component="span">
                {auth.user.userName}
            </Typography>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar alt="Users avatar" src={auth.user.avatarUrl || "/static/images/avatar/2.jpg"} />
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
                {settings.map((setting, index) => (
                    <MenuItem key={setting.path} component={Link} to={setting.path} onClick={handleClose}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                            <Typography textAlign="center">{setting.title}</Typography>
                            {settingsIcons[index]}
                        </Grid>
                    </MenuItem>
                ))}
                <hr />
                <MenuItem component={Link} to={RouteNames.HOME} onClick={handleLogout}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <Typography textAlign="center">Logout</Typography>
                        <LogoutIcon sx={{ color: "red" }} />
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
