import React from 'react';
import { Container, Box } from '@mui/material';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components/login/LoginForm';

export const LoginDisplay = () => {
	const { user } = useUser();
	const navigate = useNavigate();

	if (user) navigate('/home');

	return (
		<>
			<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
				<Container maxWidth="sm" sx={{ py: 3 }}>
					<LoginForm />
				</Container>
			</Box>
		</>
	);
};
