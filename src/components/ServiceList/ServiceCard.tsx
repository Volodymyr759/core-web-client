import { Box, Grid, Typography } from "@mui/material";
import { ServiceCardProps } from "./types";

export default function ServiceCard({ service }: ServiceCardProps): JSX.Element {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign='center'>
                    <strong>{service.title}</strong>
                </Typography>
                <Typography component={'p'} sx={{ padding: '30px 0' }}>
                    {service.description}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box component="img" sx={{ width: '100%' }} alt="Company service img." src={service.imageUrl}
                />
            </Grid>
        </>
    )

}