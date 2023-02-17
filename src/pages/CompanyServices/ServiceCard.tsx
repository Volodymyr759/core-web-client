import { Box, Grid, Typography } from "@mui/material";
import { Props } from "./types";

export default function ServiceCard({ companyService }: Props): JSX.Element {

    return (
        <Grid container spacing={2} sx={{ padding: '60px 0 30px 0;' }}>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign='center'>
                    <strong>{companyService.title}</strong>
                </Typography>
                <Typography component={'p'} sx={{ padding: '30px 0' }}>
                    {companyService.description}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    component="img"
                    sx={{ width: '100%' }}
                    alt="Company service img."
                    src={companyService.imageUrl}
                />
            </Grid>
        </Grid>
    )

}