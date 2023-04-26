import { Container, Grid } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import './styles.css';

export default function AboutPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Why Shuffle?"
                text="We founded Shuffle from a desire to deliver what we felt was lacking in the industry; exceptional tech talent and a high level of service, packaged in a way that could be customised to suit any client’s needs. We blend talent, resources and finely-tuned processes to bring you high-quality service at a sustainable cost."
            />
            <Grid container spacing={2} alignItems="center" className="page-chapter-container">
                <Grid item xs={12} md={6} textAlign='center'>
                    <img width='100%' alt="About us" src="https://volodymyr57.somee.com/uploads/about.webp" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <h3>At Shuffle, <strong>our values underpin everything we do.</strong></h3>
                    <p>
                        <i>We believe our high moral standards and dedication to our values is what sets us apart in the industry and has helped us retain so many of our valuable clients on an ongoing basis.</i>
                    </p>
                    <p>
                        In such a highly specialised field, our clients found that there was often a gap in understanding between them and their technology partners, which led to challenges in communicating and lengthy project delays. This saw them overspending on some of the most basic web development services.
                    </p>
                    <img width='100%' alt="About us 2nd img." src="https://volodymyr57.somee.com/uploads/about2.webp" />
                </Grid>
            </Grid>
        </Container>
    )
}
