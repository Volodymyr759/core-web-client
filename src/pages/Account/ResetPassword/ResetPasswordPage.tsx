import { Container, Grid } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage():JSX.Element{

    return(
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Reset your password."
                text="Send us new password you want use next time."
            />
            <Grid container direction="column" alignItems="center">
                <ResetPasswordForm />
            </Grid>
        </Container>
    )
}