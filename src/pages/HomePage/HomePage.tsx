import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { RouteNames } from '../../routing';
import AboutPage from '../AboutPage/AboutPage';
import ServicesList from '../CompanyServices/ServicesList';
import ContactPage from '../ContactPage.ts/ContactPage';
import EmployeesList from '../TeamPage/EmployeesList';

export default function HomePage(): JSX.Element {
    return (
        <>
            {/* Home page chapter */}
            <PageHeader
                title="Wellcome!"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            {/* About Us chapter */}
            <AboutPage />

            {/* Our Services chapter */}
            <PageHeader
                title="Services"
                text="Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi."
            />
            <ServicesList allowLoadMore={false} />

            {/* Team chapter */}
            <PageHeader
                title="OUR TEAM"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <EmployeesList allowLoadMore={false} />

            {/* Contact Us chapter */}
            <ContactPage />
        </>
    );
};
