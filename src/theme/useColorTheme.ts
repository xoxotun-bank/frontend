import { useMemo, useState } from 'react';

import { getDesignTokens } from '.';
import { createTheme, PaletteMode } from '@mui/material';

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggleColorMode = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  const modifiedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode
  };
};
