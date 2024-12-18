import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  open?: boolean;
  type?: AlertColor;
  message?: string;
  timeout?: number | null;
}
export const notificationInitialState: NotificationState = {
  open: false,
  type: 'info',
  message: '',
  timeout: 5000
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    addNotification: (_state, action: PayloadAction<NotificationState>) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true
    }),
    clearNotification: (state) => ({ ...state, open: false })
  }
});
export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
export const { addNotification } = notificationSlice.actions;
