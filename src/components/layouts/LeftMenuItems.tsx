import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import BuildIcon from '@mui/icons-material/Build';
import Groups2Icon from '@mui/icons-material/Groups2';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { RouteNames } from "../../routing";

export default function LeftMenuItems() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <Tooltip title="Dashboard" placement="right">
                <Link to={RouteNames.DASHBOARD} className='dashboard-menu-link'>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>
            </Tooltip>
            <Tooltip title="Manage Countries" placement="right">
                <Link to={RouteNames.ADMIN_COUNTRIES} className='dashboard-menu-link'>
                    <ListItemButton>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Countries" />
                    </ListItemButton>
                </Link>
            </Tooltip>
            <Tooltip title="Office Management" placement="right">
                <Link to={RouteNames.ADMIN_OFFICES} className='dashboard-menu-link'>
                    <ListItemButton>
                        <ListItemIcon>
                            <RoomPreferencesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Offices" />
                    </ListItemButton>
                </Link>
            </Tooltip>
            <Tooltip title="Services" placement="right">
                <Link to={RouteNames.ADMIN_SERVICES} className='dashboard-menu-link'>
                    <ListItemButton>
                        <ListItemIcon>
                            <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                    </ListItemButton>
                </Link>
            </Tooltip>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="People" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Tooltip title="Employees" placement="right">
                        <Link to={RouteNames.ADMIN_TEAM} className='dashboard-menu-link'>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <Groups2Icon />
                                </ListItemIcon>
                                <ListItemText primary="Team" />
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Candidates" placement="right">
                        <Link to={RouteNames.ADMIN_CANDIDATES} className='dashboard-menu-link'>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <PeopleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Candidates" />
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Users" placement="right">
                        <Link to={RouteNames.USERS} className='dashboard-menu-link'>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <SupervisedUserCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </List>
            </Collapse>

            <Tooltip title="Vacancies" placement="right">
                <Link to={RouteNames.ADMIN_VACANCIES} className='dashboard-menu-link'>
                    <ListItemButton>
                        <ListItemIcon>
                            <Diversity3Icon />
                        </ListItemIcon>
                        <ListItemText primary="Vacancies" />
                    </ListItemButton>
                </Link>
            </Tooltip>
        </List>
    );
}
