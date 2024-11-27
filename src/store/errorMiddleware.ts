import { isRejectedWithValue } from '@reduxjs/toolkit';
import { AnyAsyncThunk, RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { Middleware } from 'redux';

import { errorConst } from 'src/shared/constants';

import { addNotification } from './slices/notificationSlice';

export const errorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: RejectedActionFromAsyncThunk<AnyAsyncThunk>) => {
    if (isRejectedWithValue(action) && action.payload?.code === 'ERR_NETWORK') {
      dispatch(
        addNotification({
          type: 'error',
          message: errorConst.ERR_CONECTION
        })
      );
    }

    return next(action);
  };

export default errorMiddleware;
