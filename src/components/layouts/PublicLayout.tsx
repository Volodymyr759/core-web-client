import { Container } from '@mui/material';
import React, { FC } from 'react';
import Footer from '../Footer/Footer';
import MainAppBar from '../MainAppBar/MainAppBar';
import './styles.css'

type Props = {
    title?: string;
    children: React.ReactNode;
};

const PublicLayout: FC<Props> = ({ children, title }) => {
    document.title = title || 'App'
    return (
        <>
            <MainAppBar />
            <Container maxWidth="lg" className='public-layout-container' >
                {children}
            </Container>
            <Footer/>
        </>

    );
};

export default PublicLayout;