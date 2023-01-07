import { Container, Grid } from '@mui/material';
import React, { FC } from 'react';
import Footer from '../Footer/Footer';
import MainAppBar from '../MainAppBar/MainAppBar';
import './styles.css'

type Props = {
    children: React.ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
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