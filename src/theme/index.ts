import { PaletteMode, ThemeOptions } from '@mui/material';
import { amber } from '@mui/material/colors';

import { components } from './components';

import { paletteDark, paletteLight } from './palette';

const theme = {
  palette: {
    primary: amber
  }
};

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  typography: {
    fontFamily: ['Circe', 'Arial', 'sans-serif'].join(', '),
    h5: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.334
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 550,
      lineHeight: 0.6
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1
    },
    h6: {
      fontSize: 20,
      fontWeight: 550,
      lineHeight: 1.6
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5
    }
  },
  spacing: [0, '13px', '18px', '32px', '46px'],
  components,
  palette: {
    mode,
    ...(mode === 'light' ? paletteLight : paletteDark)
  }
});

export default theme;
