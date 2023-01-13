import { Grid, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import { MainMenuPathes } from '../../routing/MainMenuPathes';
import { SubscriptionForm } from './SubscriptionForm';

const Footer = () => {
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
            <Grid item xs={12} md={4} textAlign='center'>
                <Typography sx={{ margin: '0 0 20px 0', padding: '2px 0 2px 0', fontSize: 16, fontWeight: 600 }}>
                    Useful Links
                </Typography>
                <List sx={{ marginLeft: '90px' }}>
                    {MainMenuPathes.map((page) => (
                        <ListItemButton key={page.title} sx={{ padding: '0' }} onClick={() => { navigate(page.linkTo); window.scroll(0, 0) }}>
                            <ListItemIcon>
                                <StarBorder htmlColor='#1976d2' />
                            </ListItemIcon>
                            <ListItemText primary={page.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12} md={4} textAlign='center' padding={'16px 40px !important'}>
                <Typography sx={{ margin: '0 0 20px 0', padding: '2px 0 2px 0', fontSize: 16, fontWeight: 600 }}>
                    Our Newsletter
                </Typography>
                <Typography variant="body2" component={'p'}>
                    Tamen quem nulla quae legam multos aute sint culpa legam noster magna
                </Typography>
                <SubscriptionForm />
            </Grid>
        </Grid>
    )
};

export default Footer;