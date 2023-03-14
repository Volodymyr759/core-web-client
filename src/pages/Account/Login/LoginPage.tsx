import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { RouteNames } from "../../../routing";
import LoginForm from "./LoginForm";

export default function LoginPage(): JSX.Element {
    return (
        <Container>
            <PageHeader
                title="Sign in."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <Grid container direction="column" alignItems="center">
                <LoginForm />
                <Typography component={'p'} my={3} >
                    Or <Link to={RouteNames.REGISTER}>Sign Up</Link> if you already have an account.
                </Typography>
            </Grid>
        </Container>
    )
}
