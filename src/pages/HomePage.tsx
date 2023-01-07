import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { LOGIN_PAGE, REGISTER_PAGE, USERS_PAGE } from '../routing/pathes';

const HomePage = () => {
    return (
        <>
            <p></p>
            <PageHeader
                title="HOME"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <p>Sign In: </p><Link to={LOGIN_PAGE}>/login</Link>
            <p>Sign Up: </p><Link to={REGISTER_PAGE}>/register</Link>
            <p>User's list: </p><Link to={USERS_PAGE}>/users</Link>
        </>
    );
};

export default HomePage;