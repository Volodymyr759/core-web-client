import { Container, Grid } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Change Password"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <Grid container direction="column" alignItems="center">
                <ChangePasswordForm />
            </Grid>
        </Container>
    )
}