import React, { FC, ReactNode } from 'react';

import { Box, Stack, SxProps, Typography } from '@mui/material';

interface Props {
  icon?: React.JSX.Element;
  label: string;
  children: ReactNode;
  sx?: SxProps;
}

const wraperStyles: SxProps = {
  backgroundColor: 'white',
  py: '25px',
  borderRadius: '10px',
  width: '420px'
};

const contentStyles: SxProps = { overflowY: 'scroll', height: '100%', px: '25px', pt: 3 };

const TitledContainer: FC<Props> = ({ icon, label, children, sx }) => (
  <Stack sx={{ ...wraperStyles, ...sx }}>
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      {icon}
      <Typography variant="h6">{label}</Typography>
    </Stack>
    <Box sx={contentStyles}>{children} </Box>
  </Stack>
);

export default TitledContainer;
