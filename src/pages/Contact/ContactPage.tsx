import { Container, Grid, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import ContactForm from "./ContactForm";
import ContactInfoCardsList from "./ContactInfoCardsList";
import './styles.css';

export default function ContactPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="CONTACT US"
                text="We can’t wait to hear about your latest project. Need to request a quote, learn more about our service offering or ask a question?"
            />
            <Grid container spacing={2} className="page-chapter-container">
                <Grid item xs={12} md={6}>
                    <ContactInfoCardsList />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" textAlign={'center'}>
                        Or complete the contact form below <strong>and we’ll get back to you as soon as we can.</strong>
                    </Typography>
                    <ContactForm />
                </Grid>
            </Grid>
        </Container>
    )
}
