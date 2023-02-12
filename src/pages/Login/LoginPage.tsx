import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import { RouteNames } from "../../routing";
import LoginForm from "./LoginForm";

export default function LoginPage(): JSX.Element {
    return (
        <>
            <PageHeader
                title="Sign in."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '30px 0' }}>
                <LoginForm />
                <p>Or <Link to={RouteNames.REGISTER}>Sign Up</Link> if you already have account.</p>
            </div>
        </>
    )
}
