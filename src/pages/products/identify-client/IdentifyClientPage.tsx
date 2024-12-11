import React from 'react';

import { Box } from '@mui/material';

import ClientFound from 'shared/components/clientIdentity/ClientFound';
import SearchClient from 'shared/components/clientIdentity/SearchClient';

import { useClientState } from 'src/store/hooks/useClientState';

export const IdentifyClientPage = () => {
  const { client } = useClientState();

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {client ? <ClientFound /> : <SearchClient />}
    </Box>
  );
};
