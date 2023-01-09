import { Link } from "react-router-dom";
import { REGISTER_PAGE } from "../../routing/pathes";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <>
            <p></p>
            <PageHeader
                title="Sign in."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '30px 0' }}>
                <LoginForm />
                <p>Or <Link to={REGISTER_PAGE}>Sign Up</Link> if you already have account.</p>
            </div>
            <br />
        </>
    )
}

export default LoginPage;