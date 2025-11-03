import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';

export const ProtectedRoute = () => {
	const { user } = useUser();

	if (user === undefined) return null;

	return user ? <Outlet /> : <Navigate to="/login" replace />;
};
