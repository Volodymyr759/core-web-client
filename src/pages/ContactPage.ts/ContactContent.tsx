import { Box, Grid, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactInfoCardsList from "./ContactInfoCardsList";

export default function ContactContent(): JSX.Element {
    return (
        <Grid container spacing={2} sx={{ padding: '60px 0 30px 0;' }}>
            <Grid item xs={12} md={6}>
                <ContactInfoCardsList />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign={'center'}>
                    Voluptatem dignissimos <strong>provident quasi corporis voluptates</strong>
                </Typography>
                <ContactForm />
            </Grid>
        </Grid>
    )
}
