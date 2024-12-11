import React, { FC } from 'react';

import { Stack, Typography } from '@mui/material';

interface Props {
  label: string;
  text: string;
  symbol?: string;
}

export const LabeledText: FC<Props> = ({ label, text, symbol }) => (
  <Stack>
    <Typography color="#707070" variant="body2">{`${label}`}</Typography>
    <Typography variant="body1">
      {text}
      {symbol}
    </Typography>
  </Stack>
);
