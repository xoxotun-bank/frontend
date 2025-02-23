import React, { FC } from 'react';

import { Box, ThemeProvider } from '@mui/material';
import Navigation from 'shared/navigation';

import { NotificationDisplay } from './shared/components/NotificationDisplay';
import Tour from './shared/components/tutorial/Tour';
import Header from 'shared/components/Header/Header';

import styles from './App.module.css';
import { useAppSelector } from './store/store';
import { useThemeContext } from './theme/ThemeContextProvider';

const App: FC = () => {
  const { theme } = useThemeContext();
  const { isAuth, flagGuideShown } = useAppSelector(({ auth }) => auth);

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.App}>
        <Header isAuth={isAuth} />
        <Box className={styles.content}>
          {!flagGuideShown && <Tour />}
          <Navigation />
          <NotificationDisplay />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default App;
