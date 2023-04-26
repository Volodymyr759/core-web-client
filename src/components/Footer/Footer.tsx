import { Grid, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import SubscriptionForm from './SubscriptionForm';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IRoute, RouteNames } from '../../routing';
import HomePage from '../../pages/Home/HomePage';
import AboutPage from '../../pages/About/AboutPage';
import ServicesPage from '../../pages/CompanyServices/ServicesPage';
import TeamPage from '../../pages/Team/TeamPage';
import VacanciesPage from '../../pages/Vacancies/VacanciesPage';
import ContactPage from '../../pages/Contact/ContactPage';

const mainMenuRoutes: IRoute[] = [
    { path: RouteNames.HOME, title: "Home", component: <HomePage /> },
    { path: RouteNames.ABOUT, title: "About Us", component: <AboutPage /> },
    { path: RouteNames.SERVICES, title: "Services", component: <ServicesPage /> },
    { path: RouteNames.TEAM, title: "Team", component: <TeamPage /> },
    { path: RouteNames.VACANCY, title: "Vacancies", component: <VacanciesPage /> },
    { path: RouteNames.CONTACT, title: "Contact", component: <ContactPage /> }
]

export default function Footer(): JSX.Element {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} className='footer'>
            <Grid item xs={12} md={4} textAlign='center'>
                <Typography sx={{ margin: '0 0 20px 0', padding: '2px 0 2px 0', fontSize: 24, fontWeight: 700, lineHeight: 1 }}>
                    Shuffle
                </Typography>
                <Typography variant="body2" component={'p'}>
                    A108 Adam Street
                </Typography>
                <Typography variant="body2" component={'p'}>
                    NY 535022, USA
                </Typography>
                <br />
                <Typography variant="body2" component={'p'}>
                    <strong>Phone:</strong> +1 5589 55488 55
                </Typography>
                <Typography variant="body2" component={'p'}>
                    <strong>Email:</strong> info@example.com
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container direction="column" alignContent="center">
                    <Typography sx={{ margin: '0 0 20px 0', padding: '2px 0 2px 0', fontSize: 18, fontWeight: 600 }}>
                        Useful Links
                    </Typography>
                    <List>
                        {mainMenuRoutes.map((page) => (
                            <li key={page.path}>
                                <ListItemButton sx={{ padding: '0' }} onClick={() => { navigate(page.path); window.scroll(0, 0) }}>
                                    <ListItemIcon sx={{ minWidth: '20px', maxWidth: '30px' }}>
                                        <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} htmlColor='#3D4F4C' />
                                    </ListItemIcon>
                                    &nbsp;&nbsp;
                                    <ListItemText primary={page.title} />
                                </ListItemButton>
                            </li>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} textAlign='center' sx={{ padding: '16px' }}>
                <Typography sx={{ margin: '0 0 20px 0', padding: '2px 0 2px 0', fontSize: 18, fontWeight: 600 }}>
                    Our Newsletter
                </Typography>
                <Typography variant="body2" component={'p'}>
                    Get In Touch
                </Typography>
                <SubscriptionForm />
            </Grid>
        </Grid>
    )
};
