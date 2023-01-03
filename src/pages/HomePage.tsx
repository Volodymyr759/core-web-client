import { Link } from 'react-router-dom';
import { LOGIN_PAGE, REGISTER_PAGE, USERS_PAGE } from '../pathes';

const HomePage = () => {
    return (
        <div>
            <p>Sign In: </p><Link to={LOGIN_PAGE}>/login</Link>
            <p>Sign Up: </p><Link to={REGISTER_PAGE}>/register</Link>
            <p>User's list: </p><Link to={USERS_PAGE}>/users</Link>
        </div>
    );
};

export default HomePage;