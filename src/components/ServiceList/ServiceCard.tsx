import { Box, Grid } from "@mui/material";
import { ServiceCardProps } from "./types";
import './styles.css';

export default function ServiceCard({ service }: ServiceCardProps): JSX.Element {
    return (
        <>
            <Grid item xs={12} md={6}>
                <h5 className="card-header">{service.title}</h5>
                <p id="service-description">{service.description}</p>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box component="img" sx={{ width: '100%' }} alt="Company service img." src={service.imageUrl} />
            </Grid>
        </>
    )

}