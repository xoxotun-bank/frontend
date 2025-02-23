import React, { ChangeEvent, useState } from 'react';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Box, Button, Dialog, FormLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material';

import TitledContainer from 'shared/components/TitledContainer';

import { IdentifyClientConstants } from 'shared/constants/localeConstants';
import { useClientState } from 'src/store/hooks/useClientState';
import { checkOnlyNumbersInputted, formatPassportNumber, removeSpaces } from 'src/utils/Mappers';

import { NewClientModal } from './NewClientModal';

const SearchClient = () => {
  const [open, setOpen] = useState(false);
  const { continueWithClientType, searchClient, setPassport, clientPassport, isSearchingClient, error, step } =
    useClientState();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue: string = removeSpaces(event.target.value);
    if ((checkOnlyNumbersInputted(formattedValue) && formattedValue.length <= 10) || formattedValue === '')
      setPassport(formattedValue);
  };

  const onClear = () => {
    setPassport('');
  };

  const handleSearch = () => {
    searchClient(clientPassport);
  };

  const handleClose = () => setOpen(false);

  const disableSearchButton = isSearchingClient || clientPassport.length !== 10;
  const isPassportLength = clientPassport.length > 0;

  return (
    <Box className="search-client">
      <TitledContainer label={IdentifyClientConstants.IDENTIFICATION}>
        <Stack spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <FormLabel />
            <TextField
              fullWidth
              value={formatPassportNumber(clientPassport)}
              onChange={onChange}
              label={IdentifyClientConstants.PASSPORT_NUMBER}
              InputProps={{
                ...(isPassportLength && {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CancelRoundedIcon onClick={onClear} style={{ cursor: 'pointer' }} />
                    </InputAdornment>
                  )
                })
              }}
            />
          </Box>
          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}
          <Stack spacing={1}>
            <Button variant="contained" disabled={disableSearchButton} onClick={handleSearch}>
              {IdentifyClientConstants.SEARCH_BUTTON}
            </Button>
            {step === 0 && (
              <Button variant="text" onClick={continueWithClientType}>
                {IdentifyClientConstants.CONTINUE_WITH_CLIENT_TYPE}
              </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
              <NewClientModal handleClose={handleClose} />
            </Dialog>
          </Stack>
        </Stack>
      </TitledContainer>
    </Box>
  );
};

export default SearchClient;
