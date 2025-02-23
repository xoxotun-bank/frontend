import React from 'react';
import { Navigate } from 'react-router-dom';

import { AccountCircle } from '@mui/icons-material';
import { Button, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

import TitledContainer from 'shared/components/TitledContainer';

import { clientDataKeysTranslations, IdentifyClientConstants } from 'shared/constants/localeConstants';
import { AppRoutes } from 'shared/constants/routes';
import { useClientState } from 'src/store/hooks/useClientState';
import { formatDateString, formatPassportNumber } from 'src/utils/Mappers';

const ClientFound = () => {
  const { client, applyClient, rejectClient, step, applyClientCard, setNewClient } = useClientState();
  setNewClient(false);

  if (!client) return <Navigate to={AppRoutes.PRODUCTS} />;
  const { birthDate, categories, name, passport } = client;

  const formatedClientInfo = {
    categories: categories.join(', '),
    birthDate: formatDateString(birthDate ?? ''),
    name,
    passport: formatPassportNumber(passport)
  };

  return (
    <TitledContainer icon={<AccountCircle />} label={IdentifyClientConstants.CLIENT_DATA}>
      <Table>
        <TableBody>
          {Object.entries(formatedClientInfo).map(([key, value], index) => (
            <TableRow sx={{ '& td': { borderBottom: 'none', verticalAlign: 'top', width: '50%' } }} key={index}>
              <TableCell>
                <Typography color="#707070">{clientDataKeysTranslations[key]}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{value}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack spacing={1} mt={4}>
        <Button variant="contained" onClick={step === 2 ? applyClientCard : applyClient}>
          {IdentifyClientConstants.CONTINUE}
        </Button>
        <Button variant="outlined" onClick={rejectClient}>
          {IdentifyClientConstants.CHANGE_DATA}
        </Button>
      </Stack>
    </TitledContainer>
  );
};

export default ClientFound;
