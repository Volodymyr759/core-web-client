import { Box, Container, Grid } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";
import './styles.css';

export default function AboutPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="ABOUT US"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <Grid container spacing={2} alignItems="center" className="page-chapter-container">
                <Grid item xs={12} md={6} textAlign='center'>
                    <Box component="img" sx={{ width: '100%' }} alt="About us img." src="https://volodymyr57.somee.com/Uploads/about.jpg" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <h3>Voluptatem dignissimos <strong>provident quasi corporis voluptates</strong></h3>
                    <p>
                        <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</i>
                    </p>
                    <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                    </p>
                    <Box component="img" sx={{ width: '100%' }} alt="About us 2nd img." src="https://volodymyr57.somee.com/uploads/about2.jpg" />
                </Grid>
            </Grid>
        </Container>
    )
}
