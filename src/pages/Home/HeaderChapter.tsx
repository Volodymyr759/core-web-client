import { Button, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../routing';
import './styles.css';

export default function HeaderChapter(): JSX.Element {
    const navigate = useNavigate();

    return (
        <Paper className="header-chapter-bg">
            <Container fixed maxWidth='md' sx={{ padding: '0 30px' }} >
                <Grid container direction="column" alignContent="center" maxWidth="50%">
                    <Grid item mt={10} mb={3}>
                        <h3 className="header-chapter-header">Shuffle Solutions</h3>
                    </Grid>
                    <Grid item>
                        <p id="description">
                            Our industry leading team will drive and support your digital projects end to end.
                        </p>
                    </Grid>
                    <Grid item mt={4} mb={8}>
                        <Button className='btn-transit' variant='contained' color='primary'
                            onClick={() => { navigate(RouteNames.SERVICES); window.scroll(0, 0) }}
                        >
                            Learn more ...
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}