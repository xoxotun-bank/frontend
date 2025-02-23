import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AnalyticsPage from 'src/pages/analytics/AnalyticsPage';
import AuthorizationPage from 'src/pages/authorization/AuthorizationPage';
import ProductsPage from 'src/pages/products/ProductsPage';
import { UserRole } from 'src/types';

import { AppRoutes } from '../constants/routes';

interface AppRouterProps {
  isAuth: boolean;
  userRole?: UserRole;
}

const AppRouter: FC<AppRouterProps> = ({ isAuth, userRole }) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path={AppRoutes.AUTHORIZATION} element={<AuthorizationPage />} />
        <Route path="*" element={<Navigate to={AppRoutes.AUTHORIZATION} />} />
      </Routes>
    );
  }

  if (!userRole || userRole === UserRole.OPERATOR) {
    return (
      <Routes>
        <Route path={AppRoutes.PRODUCTS} element={<ProductsPage />} />
        <Route path="*" element={<Navigate to={AppRoutes.PRODUCTS} />} />
      </Routes>
    );
  }

  if (userRole === UserRole.ADMIN) {
    return (
      <Routes>
        <Route path={AppRoutes.ANALYTICS} element={<AnalyticsPage />} />
        <Route path="*" element={<Navigate to={AppRoutes.ANALYTICS} />} />
      </Routes>
    );
  }
};

export default AppRouter;
