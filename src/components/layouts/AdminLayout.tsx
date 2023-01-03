import { Container } from '@mui/material';
import React, { FC } from 'react';
import './styles.css';

type Props = {
    children: React.ReactNode;
};

const AdminLayout: FC<Props> = ({ children }) => {
    return (
        <Container 
        // maxWidth="xl" 
        className="admin-layout-container"
        >
            {children}
        </Container>
    );
};

export default AdminLayout;