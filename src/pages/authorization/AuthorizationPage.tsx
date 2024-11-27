import React from 'react';

import { Box } from '@mui/material';
import AuthForm from 'pages/authorization/AuthForm/AuthForm';

const AuthorizationPage = () => (
  <Box sx={{ height: '100%', width: '100%' }}>
    <AuthForm />
  </Box>
);

export default AuthorizationPage;
