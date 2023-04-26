import Footer from '../Footer/Footer';
import MainAppBar from '../AppBars/MainAppBar/MainAppBar';
import { LayoutProps } from './types';
import './styles.css'
import StandForUkraine from '../StandForUkraine/StandForUkraine';

export default function PublicLayout({ children, title }: LayoutProps): JSX.Element {
    document.title = title || 'App';
    return (
        <>
            <StandForUkraine />
            <MainAppBar />
            {children}
            <Footer />
        </>

    );
};
