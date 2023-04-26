import { Grid } from "@mui/material";
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
                <img width='100%' alt="Company service" src={service.imageUrl} />
            </Grid>
        </>
    )

}