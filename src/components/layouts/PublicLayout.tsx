import { Container, Grid } from '@mui/material';
import React, { FC } from 'react';
import MainAppBar from '../MainAppBar/MainAppBar';
import './styles.css'

type Props = {
    children: React.ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
    return (
        <Container maxWidth="lg" className='public-layout-container' >
            <Grid item xs={12}>
                <MainAppBar />
            </Grid>
            {children}
        </Container>
    );
};

export default PublicLayout;