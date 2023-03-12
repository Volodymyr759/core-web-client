import { Container } from '@mui/material';
import MainAppBar from '../AppBars/MainAppBar/MainAppBar';
import AdminAppBar from '../AppBars/AdminAppBar/AdminAppBar';
import Footer from '../Footer/Footer';
import { LayoutProps } from './types';
import './styles.css';

export default function AdminLayout({ children, title }: LayoutProps): JSX.Element {
    document.title = title || 'Admin';
    return (
        <>
            <MainAppBar />
            <AdminAppBar />
            <Container className="layout-container" >
                {children}
            </Container>
            <Footer />
        </>
    );
};
