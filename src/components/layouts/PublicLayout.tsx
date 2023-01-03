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
        {/* // <Container maxWidth="md"> */}
            <Grid item xs={12}>
                {/* <img
                    src='https://s3propertyspace-dev.s3.eu-central-1.amazonaws.com/builds/ps_lease/1650555570/static/media/logo-with-text.55fc870d.svg'
                    alt='Logo'
                    className='logo'
                /> */}
                <MainAppBar />
            </Grid>
            {children}
        </Container>
    );
};

export default PublicLayout;