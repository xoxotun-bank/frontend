import { Components } from '@mui/material';

export const components: Components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true
    }
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: '17px'
      }
    }
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        borderRadius: '17px'
      }
    }
  }
};
