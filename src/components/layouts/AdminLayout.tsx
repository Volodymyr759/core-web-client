import { Container } from '@mui/material';
import React, { FC } from 'react';
import './styles.css';

type Props = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }): JSX.Element {
    return (
        <Container className="admin-layout-container" >
            {children}
        </Container>
    );
};
