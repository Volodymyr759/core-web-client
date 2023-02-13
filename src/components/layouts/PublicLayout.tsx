import React from 'react';
import { Container } from '@mui/material';
import Footer from '../Footer/Footer';
import MainAppBar from '../MainAppBar/MainAppBar';
import './styles.css'

type Props = {
    title?: string;
    children: React.ReactNode;
};

export default function PublicLayout({ children, title }: Props): JSX.Element {
    document.title = title || 'App'
    return (
        <>
            <MainAppBar />
            <Container maxWidth="lg" className='public-layout-container' >
                {children}
            </Container>
            <Footer />
        </>

    );
};
