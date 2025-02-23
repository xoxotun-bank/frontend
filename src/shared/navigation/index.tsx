import React, { useEffect } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';
import { checkAuth } from 'src/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/store';

import { getUserRole } from 'src/utils/Mappers';

import AppRouter from './AppRouter';

const Navigation = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isCheckingAuth = useAppSelector((state) => state.auth.isCheckingAuth);
  const user = useAppSelector((state) => state.auth.user);

  const userRole = getUserRole(user);

  useEffect(() => {
    if (!isAuth) dispatch(checkAuth());
  }, []);

  if (isCheckingAuth)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );

  return <AppRouter isAuth={isAuth} userRole={userRole} />;
};

export default Navigation;
