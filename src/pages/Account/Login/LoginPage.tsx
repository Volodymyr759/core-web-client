import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { RouteNames } from "../../../routing";
import LoginForm from "./LoginForm";

export default function LoginPage(): JSX.Element {
    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Sign In."
                text="For DEMO proposes you can use email 'admin@example.com' and password 'Example.'"
            />
            <Grid container direction="column" alignItems="center">
                <LoginForm />
                <Typography component={'p'} my={3} >
                    Or <Link to={RouteNames.REGISTER}>Sign Up</Link> if you don't have an account yet.
                </Typography>
                <Typography component={'p'} mb={3} >
                    <Link to={RouteNames.FORGOT_PASSWORD}>Forgot password?</Link>
                </Typography>
            </Grid>
        </Container>
    )
}
