import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../routing';
import AboutPage from '../AboutPage/AboutPage';
import ContactPage from '../ContactPage/ContactPage';
import ServiceChapter from './ServiceChapter';
import TeamChapter from './TeamChapter';

export default function HomePage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <>
            <Paper sx={{ backgroundImage: 'url(https://source.unsplash.com/random)', borderRadius: '0' }}>
                <Container fixed maxWidth='md' >
                    <Grid container direction="column" alignContent="center" maxWidth="50%">
                        <Grid item mt={10} mb={3}>
                            <Typography variant='h3' color="white">
                                Eivolo Solutions
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h5' color="white">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quo non praesentium quas.
                            </Typography>
                        </Grid>
                        <Grid item mt={4} mb={8}>
                            <Button variant='contained' color='primary' sx={{ textTransform: 'none' }}
                                onClick={() => { navigate(RouteNames.SERVICES); window.scroll(0, 0) }}
                            >
                                Learn more...
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <Container maxWidth="lg" className='layout-container' >
                <AboutPage />

                <ServiceChapter />

                <TeamChapter />

                <ContactPage />
            </Container>

        </>
    );
};
