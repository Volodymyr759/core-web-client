import { useState } from 'react';
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import KeyIcon from '@mui/icons-material/Key';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingsBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="App Settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <SettingsIcon sx={{ color: "white" }} />
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
                <MenuItem onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Info</Typography>
                        <InfoIcon sx={{ color: "#4b605c" }} />
                    </Grid>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Users</Typography>
                        <GroupIcon sx={{ color: "#4b605c" }} />
                    </Grid>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="20px">
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Roles</Typography>
                        <KeyIcon sx={{ color: "#4b605c" }} />
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
