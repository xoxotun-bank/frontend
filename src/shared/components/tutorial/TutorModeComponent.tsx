import React, { FC } from 'react';

import { Tooltip } from '@mui/material';
import { useAppSelector } from 'src/store';

interface Props {
  label: string;
  children: React.JSX.Element;
}

export const TutorModeComponent: FC<Props> = ({ label, children }) => {
  const { isTutorMode } = useAppSelector(({ auth }) => auth);
  return isTutorMode ? (
    <Tooltip title={label} placement="top" arrow>
      {children}
    </Tooltip>
  ) : (
    children
  );
};
