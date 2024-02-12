import { Container } from '@mui/material';
import AboutPage from '../About/AboutPage';
import ContactPage from '../Contact/ContactPage';
import HeaderChapter from './HeaderChapter';
import ServiceChapter from './ServiceChapter';
import TeamChapter from './TeamChapter';
import StatisticsChapter from './StatisticsChapter';

export default function HomePage(): JSX.Element {
    return (
        <>
            <HeaderChapter />
            <Container maxWidth="lg" className='layout-container' >
                <AboutPage />
                <ServiceChapter />
                <StatisticsChapter />
                <TeamChapter />
                <ContactPage />
            </Container>
        </>
    );
};
