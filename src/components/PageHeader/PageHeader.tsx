import { Grid, Typography } from "@mui/material";
import { PageHeaderProps } from './types';
import './styles.css';

export default function PageHeader({ title, text }: PageHeaderProps): JSX.Element {
    return (
        <Grid container spacing={2} direction='column' alignItems={'center'} justifyContent={'center'}>
            <Grid item>
                <Typography variant="h4" component={'h4'} className="page-header">{title}</Typography>
            </Grid>
            {text &&
                <Grid item>
                    <Typography component={'p'} className="page-subheader" sx={{ textAlign: 'center' }}>{text}</Typography>
                </Grid>}
        </Grid>
    )
};