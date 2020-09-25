import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { isAuthenticated } from '../services/auth';

const Routes: React.FC = () => {
  return isAuthenticated() ? <AuthRoutes /> : <AppRoutes />;

};

export default Routes;
