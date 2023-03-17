import { Container, Grid } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ChangeEmailForm from "./ChangeEmailForm";

export default function ChangeEmailPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Change Email"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <Grid container direction="column" alignItems="center">
                <ChangeEmailForm />
            </Grid>
        </Container>
    )
}