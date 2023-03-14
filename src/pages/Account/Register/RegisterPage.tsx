import { Container } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import RegisterForm from "./RegisterForm";

export default function RegisterPage(): JSX.Element {
    return (
        <Container>
            <PageHeader
                title="Sign Up."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <RegisterForm />
        </Container>
    )
}
