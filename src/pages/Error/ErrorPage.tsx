import Grid from '@mui/material/Grid';
import '../../index.css';
import { Props } from './types';
import { Typography } from '@mui/material';
import PageHeader from '../../components/PageHeader/PageHeader';

export default function ErrorPage({ status = '500', message = 'Internal Server Error' }: Props): JSX.Element {

    return (
        <Grid container direction="column">
            <Grid item>
                <PageHeader title="Oops! Something went wrong." />
            </Grid>
            <Grid item>
                <Typography component={'p'} sx={{ padding: '10px' }}>
                    Error status: {status}
                </Typography>
                <Typography component={'p'} sx={{ color: 'red', padding: '10px' }}>
                    {message}
                </Typography>
            </Grid>
        </Grid>
    )

};
