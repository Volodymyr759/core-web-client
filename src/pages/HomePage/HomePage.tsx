import PageHeader from '../../components/PageHeader/PageHeader';
import AboutPage from '../AboutPage/AboutPage';
import ContactPage from '../ContactPage/ContactPage';
import EmployeesList from '../TeamPage/EmployeesList';
import ServiceChapter from './ServiceChapter';

export default function HomePage(): JSX.Element {

    return (
        <>
            {/* Home page chapter */}
            <PageHeader
                title="Wellcome!"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />

            <AboutPage />

            <ServiceChapter />

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
