import React, { FC } from 'react';

import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { ClientData } from 'src/types';

import { clientCardConst } from 'shared/constants';
import { formatDateString, formatPassportNumber } from 'src/utils/Mappers';

import styles from './Confirmation.module.css';

const stringAvatar = (name: string): string => `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;

interface Props {
  client: ClientData;
}
const ClientCard: FC<Props> = ({ client }) => {
  const { name, categories, passport, birthDate } = client;
  const formattedDate = formatDateString(birthDate ?? '');

  return (
    <Paper className={`${styles.wrapperClient} clientData`}>
      <Avatar sx={{ width: 154, height: 154 }}>{stringAvatar(name)}</Avatar>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Stack>
          <Typography variant="body2" color="#999999">
            {clientCardConst.CLIENT_NAME}
          </Typography>
          <Typography variant="body1">{name}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body2" color="#999999">
            {clientCardConst.PASSPORT}
          </Typography>
          <Typography variant="body1">{formatPassportNumber(passport)}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body2" color="#999999">
            {clientCardConst.BIRTH_DATE}
          </Typography>
          <Typography variant="body1">{formattedDate}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body2" color="#999999">
            {clientCardConst.CLIENT_CATEGORY}
          </Typography>
          <Typography variant="body1">{categories.join(', ')}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ClientCard;
