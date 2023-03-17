import { Container, Grid, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import ContactForm from "./ContactForm";
import ContactInfoCardsList from "./ContactInfoCardsList";

export default function ContactPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="CONTACT US"
                text="Lorem ipsum dolor..."
            />
            <Grid container spacing={2} className="page-chapter-container">
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
        </Container>
    )
}
