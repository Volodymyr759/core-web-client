import { useState } from 'react';
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function HelpBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Help">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <HelpOutlineIcon sx={{ color: "white" }} />
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
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <SchoolIcon sx={{ color: "#4b605c" }} />
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Knowledge base</Typography>
                    </Grid>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <ChatIcon sx={{ color: "#4b605c" }} />
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Chat with support</Typography>
                    </Grid>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center" gap="10px">
                        <ThumbUpIcon sx={{ color: "#4b605c" }} />
                        <Typography sx={{ textAlign: "left", fontSize: "0.95rem" }}>Suggest a feature</Typography>
                    </Grid>
                </MenuItem>
            </Menu>
        </Box>
    )
}
