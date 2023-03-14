import Footer from '../Footer/Footer';
import MainAppBar from '../AppBars/MainAppBar/MainAppBar';
import { LayoutProps } from './types';
import './styles.css'

export default function PublicLayout({ children, title }: LayoutProps): JSX.Element {
    document.title = title || 'App';
    return (
        <>
            <MainAppBar />
            {children}
            <Footer />
        </>

    );
};
