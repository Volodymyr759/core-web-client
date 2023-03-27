import Grid from '@mui/material/Grid';
import '../../index.css';
import { Props } from './types';
import { Container, Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';

export default function ErrorPage({ status = '500', message = 'Internal Server Error' }: Props): JSX.Element {

    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader title="Oops! Something went wrong." />
            <Grid>
                <Typography component={'p'} sx={{ padding: '10px', marginTop: '20px' }}>
                    Error status: {status}
                </Typography>
                <Typography component={'p'} sx={{ color: 'red', padding: '10px' }}>
                    {message}
                </Typography>
            </Grid>
        </Container>
    )

};
