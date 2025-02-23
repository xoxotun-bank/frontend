import React from 'react';

import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useAppSelector } from 'src/store';

import { useNotification } from 'src/store/hooks/useNotification';

export const NotificationDisplay = () => {
  const notification = useAppSelector((state) => state.notification);
  const { clearNotification } = useNotification();

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) => {
    reason !== 'clickaway' && clearNotification();
  };

  return (
    <Snackbar open={notification.open} autoHideDuration={notification.timeout} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
