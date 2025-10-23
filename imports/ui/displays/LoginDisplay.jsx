import React from 'react';
import {
  Container, Box,
} from '@mui/material';

import { LoginForm } from '../components/login/LoginForm';

export const LoginDisplay = () => {
    return(<>
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <Container maxWidth="sm" sx={{ py: 3 }}>
        <LoginForm />
    </Container>
  </Box>
  </>);
};
