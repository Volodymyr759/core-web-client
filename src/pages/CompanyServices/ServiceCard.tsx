import { Box, Grid, Typography } from "@mui/material";
import { ServiceCardProps } from "./types";

export default function ServiceCard({ companyService }: ServiceCardProps): JSX.Element {

    return (
        <>
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
        </>
    )

}