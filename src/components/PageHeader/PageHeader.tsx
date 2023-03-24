import { Grid } from "@mui/material";
import { PageHeaderProps } from './types';
import './styles.css';

export default function PageHeader({ title, text }: PageHeaderProps): JSX.Element {
    return (
        <Grid container spacing={2} direction='column' alignItems={'center'} justifyContent={'center'}>
            <Grid item className="grid-item">
                <h4 className="page-header">{title}</h4>
            </Grid>
            {text &&
                <Grid item className="grid-item">
                    <p className="page-subheader">{text}</p>
                </Grid>}
        </Grid>
    )
};