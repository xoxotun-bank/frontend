import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { authorize, authout, refreshTokens } from 'src/api/AuthService';
import { AuthResponse } from 'src/types/response';
import { AccessToken, UserCredentials, UserData } from 'src/types/User';

import { ValidationConst } from 'src/shared/constants';

import { resetState as resetAnalyticsState } from './analyticsSlice';
import { resetState as resetClientState } from './clientSlice';
import { resetProductState } from './productSlice';

interface UserState {
  user: UserData | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  isAuth: boolean;
  flagGuideShown: boolean;
  isTutorMode: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isCheckingAuth: true,
  isLoading: false,
  error: null,
  flagGuideShown: true,
  isTutorMode: false
};

export const login = createAsyncThunk('auth/login', (userCredentials: UserCredentials, { rejectWithValue }) => {
  return authorize(userCredentials)
    .then((res) => {
      const { accessToken, refreshToken, flagGuideShown } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const { user_id, roles } = jwtDecode<AccessToken>(accessToken);

      return { user_id, roles, flagGuideShown };
    })
    .catch((error) => rejectWithValue(error));
});

export const logout = createAsyncThunk('auth/logout', (_, { dispatch, rejectWithValue }) => {
  return authout()
    .then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('login');
      dispatch(resetClientState());
      dispatch(resetProductState());
      dispatch(resetAnalyticsState());
    })
    .catch((error) => rejectWithValue(error));
});

export const checkAuth = createAsyncThunk('auth/checkAuth', (_, { rejectWithValue }) => {
  return refreshTokens()
    .then((res) => {
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const { roles, user_id } = jwtDecode<AccessToken>(accessToken);

      return { roles, user_id };
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => {
      return { ...initialState, isLoading: false };
    },
    clearUser(state) {
      state.user = null;
    },
    changeTutorMode(state) {
      state.isTutorMode = !state.isTutorMode;
    },
    startTutor(state) {
      state.flagGuideShown = false;
      state.isTutorMode = false;
    },
    endTutor(state) {
      state.flagGuideShown = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { roles, user_id, flagGuideShown } = action.payload;
        state.user = {
          userRoles: roles,
          userId: user_id
        };
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.flagGuideShown = flagGuideShown;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        const error = action.payload as AxiosError<AuthResponse>;
        const errorStatus = error.response?.status.toString();
        if (!errorStatus) return;
        if (errorStatus.startsWith('4')) {
          state.error = ValidationConst.INVALID_CREDENTIALS;
        } else if (errorStatus.startsWith('5')) {
          state.error = ValidationConst.SERVER_ERROR;
        }
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { roles, user_id } = action.payload;
        state.user = {
          userRoles: roles,
          userId: user_id
        };
        state.isCheckingAuth = false;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        Object.assign(state, initialState);
        state.isCheckingAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.isCheckingAuth = false;
      });
  }
});

export default authSlice.reducer;
export const { changeTutorMode, startTutor, endTutor, logoutUser } = authSlice.actions;
