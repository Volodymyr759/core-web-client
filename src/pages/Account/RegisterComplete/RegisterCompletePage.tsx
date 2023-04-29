import { Container, Grid, Typography } from "@mui/material"
import PageHeader from "../../../components/PageHeader/PageHeader"

export default function RegisterCompletePage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Registration Successful."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <Grid container>
                <Grid item>
                    <Typography component={'p'} sx={{ padding: '30px 0' }}>
                        Please check your mail-box and confirm the email-address before login.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}