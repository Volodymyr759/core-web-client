import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../routing';
import { Tooltip } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import BuildIcon from '@mui/icons-material/Build';
import Groups2Icon from '@mui/icons-material/Groups2';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export const mainListItems = (
    <React.Fragment>
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
        <Tooltip title="Employees" placement="right">
            <Link to={RouteNames.ADMIN_TEAM} className='dashboard-menu-link'>
                <ListItemButton>
                    <ListItemIcon>
                        <Groups2Icon />
                    </ListItemIcon>
                    <ListItemText primary="Team" />
                </ListItemButton>
            </Link>
        </Tooltip>
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
        <Tooltip title="Candidates" placement="right">
            <Link to={RouteNames.ADMIN_CANDIDATES} className='dashboard-menu-link'>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Candidates" />
                </ListItemButton>
            </Link>
        </Tooltip>
        <Tooltip title="Users" placement="right">
            <Link to={RouteNames.USERS} className='dashboard-menu-link'>
                <ListItemButton>
                    <ListItemIcon>
                        <SupervisedUserCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </Link>
        </Tooltip>
    </React.Fragment >
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);