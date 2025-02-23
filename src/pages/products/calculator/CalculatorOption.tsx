import React, { FC } from 'react';

import { FormLabel, Stack, Tooltip } from '@mui/material';

interface Props {
  label: string;
  tooltip?: string;
  isTutorMode?: boolean;
  children: React.JSX.Element;
}

const CalculatorOption: FC<Props> = ({ label, children, tooltip, isTutorMode }) => (
  <Stack spacing={1}>
    {isTutorMode ? (
      <Tooltip title={tooltip} placement="top" arrow>
        <FormLabel>{label}</FormLabel>
      </Tooltip>
    ) : (
      <FormLabel>{label}</FormLabel>
    )}
    {children}
  </Stack>
);

export default CalculatorOption;
