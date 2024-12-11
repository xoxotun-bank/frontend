import React, { FC, ReactNode } from 'react';

import { Box, Stack, SxProps, Typography } from '@mui/material';

interface Props {
  icon?: React.JSX.Element;
  label: string;
  children: ReactNode;
  sx?: SxProps;
  legend?: {
    icon?: React.JSX.Element;
    text?: string;
  }[];
}

const wraperStyles: SxProps = {
  backgroundColor: 'white',
  py: '25px',
  borderRadius: '10px',
  width: '420px'
};

const titleStyles: SxProps = { fontWeight: 700 };

const contentStyles: SxProps = { overflowY: 'scroll', height: '100%', px: '25px' };

const TitledContainer: FC<Props> = ({ icon, label, children, sx, legend }) => {
  const { icon: legendIconProof, text: legendTextProof } = legend?.[0] ?? {};
  const { icon: legendIconDisproof, text: legendTextDisproof } = legend?.[1] ?? {};
  return (
    <Stack sx={{ ...wraperStyles, ...sx }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" pb={3}>
        {icon}
        <Typography variant="h6" sx={titleStyles}>
          {label}
        </Typography>
      </Stack>
      <Box sx={contentStyles}>{children} </Box>
      {legend && (
        <Stack
          direction="row"
          spacing={3}
          alignItems="flex-end"
          justifyContent="center"
          mt={1}
          sx={{ minWidth: '800px' }}
        >
          <Stack direction="row" spacing={1}>
            {legendIconProof}
            <Typography variant="body1">{legendTextProof}</Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            {legendIconDisproof}
            <Typography variant="body1">{legendTextDisproof}</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default TitledContainer;
