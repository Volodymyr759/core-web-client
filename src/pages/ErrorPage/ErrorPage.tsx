import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '../../components/Button/Button';
import '../../index.css';
import { RouteNames } from '../../routing';
import { Props } from './types';

export default function ErrorPage({ status = '500', message = 'Internal Server Error' }: Props): JSX.Element {
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
                            onClick={() => navigate(RouteNames.HOME)}
                        >
                            Home
                        </Button>
                    </p>
                </Card>
            </Grid>
        </Grid>
    )

};