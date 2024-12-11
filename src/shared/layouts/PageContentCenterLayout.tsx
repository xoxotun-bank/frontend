import React from 'react';

import { Box } from '@mui/material';

interface PageContentCenterLayoutProps {
  children: React.ReactNode;
}

const PageContentCenterLayout: React.FC<PageContentCenterLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {children}
    </Box>
  );
};

export default PageContentCenterLayout;
