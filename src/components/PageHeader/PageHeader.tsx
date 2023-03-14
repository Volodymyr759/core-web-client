import { Grid, Typography } from "@mui/material";
import { PageHeaderProps } from './types';

export default function PageHeader({ title, text }: PageHeaderProps): JSX.Element {
    return (
        <Grid container spacing={2} direction='row' justifyContent={'center'}>
            <Grid item>
                <Typography variant="h4" component={'p'} sx={{ padding: '20px', fontWeight: 600, textAlign: 'center' }}>
                    {title}
                </Typography>
                {text && <Typography component={'p'} sx={{ textAlign: 'center' }}>{text}</Typography>}
            </Grid>
        </Grid>
    )
};