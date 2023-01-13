import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { HOME } from '../routing/pathes';
import { Button } from '../components/Button/Button';
import '../index.css';

interface Props {
    status?: string;
    message?: string;
}

export const ErrorPage = ({ status = '500', message = 'Internal Server Error' }: Props) => {
    const navigate = useNavigate();

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyItems="center"
            className="grid-large"
        >
            <Grid item xs={3}>
                <Card className="card-wrapper" >
                    <h1 className='text-primary-large'>{status}</h1>
                    <h2 className='text-primary text-centered'>{message}</h2>
                    <p className='text-centered'>
                        <Button
                            appearance='primary'
                            onClick={() => navigate(HOME.path)}
                        >
                            Home
                        </Button>
                    </p>
                </Card>
            </Grid>
        </Grid>
    )

};

export default ErrorPage;