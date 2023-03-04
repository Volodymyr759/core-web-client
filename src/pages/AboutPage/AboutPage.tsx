import { Box, Grid, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function AboutPage(): JSX.Element {
    return (
        <>
            <PageHeader
                title="ABOUT US"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <Grid container spacing={2} className="page-chapter-container">
                <Grid item xs={12} md={6} textAlign='center'>
                    <Box component="img" sx={{ width: '100%' }} alt="About us img." src="/images/about.jpg" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                        Voluptatem dignissimos <strong>provident quasi corporis voluptates</strong>
                    </Typography>
                    <Typography variant="body2" component={'p'}>
                        <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</i>
                    </Typography>
                    <Typography component={'p'} sx={{ padding: '30px 0' }}>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                    </Typography>
                    <Box component="img" sx={{ width: '100%' }} alt="About us 2nd img." src="/images/about2.jpg" />
                </Grid>
            </Grid>
        </>
    )
}
