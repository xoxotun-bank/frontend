import React, { FC } from 'react';

import { Close, Done } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

interface Props {
  options: { [key: string]: boolean };
}

export const DepositOptions: FC<Props> = ({ options }) => {
  const setIcon = (value: boolean) => (value ? <Done /> : <Close />);
  const setColor = (value: boolean) => (value ? 'primary.main' : 'text.disabled');
  return (
    <Stack direction="row" spacing={2}>
      {Object.entries(options).map(([key, value]) => (
        <Button
          key={key}
          variant="outlined"
          size="small"
          startIcon={setIcon(value)}
          sx={{
            borderRadius: '25px',
            pointerEvents: 'none',
            color: setColor(value),
            borderColor: setColor(value),
            '&.Mui-disabled': {
              color: setColor(value),
              borderColor: setColor(value)
            }
          }}
        >
          {key}
        </Button>
      ))}
    </Stack>
  );
};
