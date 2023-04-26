import { Container } from '@mui/material';
import AboutPage from '../About/AboutPage';
import ContactPage from '../Contact/ContactPage';
import HeaderChapter from './HeaderChapter';
import ServiceChapter from './ServiceChapter';
import TeamChapter from './TeamChapter';
import StatisticsChapter from './StatisticsChapter';
import { AnimateIn } from '../../components/AnimateIn/AnimateIn';

export default function HomePage(): JSX.Element {
    return (
        <>
            <HeaderChapter />

            <Container maxWidth="lg" className='layout-container' >

                <AboutPage />

                <ServiceChapter />

                <AnimateIn>
                    <StatisticsChapter />
                </AnimateIn >

                <TeamChapter />

                <AnimateIn>
                    <ContactPage />
                </AnimateIn >

            </Container>
        </>
    );
};
