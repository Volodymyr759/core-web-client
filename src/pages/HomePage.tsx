import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader/PageHeader';
import { RouteNames } from '../routing';

export default function HomePage(): JSX.Element {
    return (
        <>
            <PageHeader
                title="HOME"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <p>Sign In: </p><Link to={RouteNames.LOGIN}>/login</Link>
            <p>Sign Up: </p><Link to={RouteNames.REGISTER}>/register</Link>
            <p>User's list: </p><Link to={RouteNames.USERS}>/users</Link>
        </>
    );
};
