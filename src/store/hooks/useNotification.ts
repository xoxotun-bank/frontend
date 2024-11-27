import { useDispatch } from 'react-redux';

import { notificationActions, NotificationState } from '../slices/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch();
  const displayNotification = (notification: NotificationState) => {
    dispatch(notificationActions.addNotification(notification));
  };
  const clearNotification = () => {
    dispatch(notificationActions.clearNotification());
  };
  return { displayNotification, clearNotification } as const;
};
