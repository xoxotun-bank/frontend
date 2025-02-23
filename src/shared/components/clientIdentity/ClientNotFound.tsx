import React from 'react';

import ErrorOutlinIcon from '@mui/icons-material/ErrorOutline';
import { Button, Stack, Typography } from '@mui/material';

import TitledContainer from 'shared/components/TitledContainer';

import { IdentifyClientConstants } from 'shared/constants/localeConstants';
import { useClientState } from 'src/store/hooks/useClientState';

const ClientNotFound = () => {
  const { applyClient, rejectClient } = useClientState();

  const handleContinue = () => {
    applyClient();
  };

  const handleChangeData = () => {
    rejectClient();
  };

  return (
    <TitledContainer icon={<ErrorOutlinIcon />} label={IdentifyClientConstants.CLIENT_NOT_FOUND}>
      <Stack spacing={3}>
        <Typography>{IdentifyClientConstants.HELPER_TEXT}</Typography>

        <Stack spacing={1}>
          <Button variant="contained" onClick={handleChangeData}>
            {IdentifyClientConstants.CHANGE_DATA}
          </Button>
          <Button variant="outlined" onClick={handleContinue}>
            {IdentifyClientConstants.CONTINUE_WITH_CLIENT_TYPE}
          </Button>
        </Stack>
      </Stack>
    </TitledContainer>
  );
};

export default ClientNotFound;
