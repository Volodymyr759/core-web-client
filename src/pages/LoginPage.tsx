import { Link } from "react-router-dom";
import { REGISTER_PAGE } from "../pathes";

const LoginPage = () => {

    return (
        <div>
            <p>Log in.</p>
            <p>Or Sign Up: <Link to={REGISTER_PAGE}>registration</Link></p>
        </div>
    )
}

export default LoginPage;