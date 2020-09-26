import React, { useState, useEffect } from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { checkAuthenticated } from '../services/auth';

const Routes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    checkAuthenticated().then(isAuth => {
      if (isAuth) setIsAuthenticated(true);
    });
  }, []);

  // console.log(isAuthenticated());
  return isAuthenticated ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
