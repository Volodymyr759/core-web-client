import { Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import { ServiceListProps } from "./types";

export default function ServicesList({ services }: ServiceListProps): JSX.Element {
    return (
        <Grid container spacing={2} className="page-chapter-container">
            {services.map(service => <ServiceCard key={service.id} service={service} />)}
        </Grid>
    )

}