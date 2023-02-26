import React from 'react';
import { Container } from '@mui/material';
import MainAppBar from '../MainAppBar/MainAppBar';
import AdminAppBar from '../AdminAppBar/AdminAppBar';
import './styles.css';

type Props = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: Props): JSX.Element {
    return (
        <>
            <MainAppBar />
            <div style={{margin: '10px', padding: '10px'}}>
                <AdminAppBar />
            </div>

            {/* <Container className="admin-layout-container" >
                {children}
            </Container> */}
            <Container className="public-layout-container" >
                {children}
            </Container>
        </>

    );
};
