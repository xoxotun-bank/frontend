import React, { FC, useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material';
import { login } from 'src/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { UserCredentials } from 'src/types/User';

import { ControlledTextField } from 'src/shared/components';

import { AuthFormConst } from 'shared/constants/localeConstants';

import styles from './AuthForm.module.css';
import { loginValidation } from './authValidation';

const defaultValues = {
  login: '',
  password: ''
};

const AuthForm: FC = () => {
  const { handleSubmit, control, getValues } = useForm<UserCredentials>({
    mode: 'onChange',
    defaultValues: defaultValues
  });
  const { errors } = useFormState({ control });
  const dispatch = useAppDispatch();
  const { error: serverError, isLoading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<UserCredentials> = () => {
    const userCredentials = getValues();
    dispatch(login(userCredentials));
  };

  const disableSubmission = errors.password?.message || errors.login?.message;

  return (
    <Box className={styles.styleBox}>
      <form className={styles.styleForm} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography align="center" color="#373A36 " variant="h5" pt={2}>
            {AuthFormConst.TITLE_FORM}
          </Typography>
          <FormControl>
            <ControlledTextField
              name="login"
              control={control}
              label={AuthFormConst.LOG}
              variant="standard"
              type="text"
              rules={loginValidation}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <ControlledTextField
              control={control}
              name="password"
              className={styles.styleInput}
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              label={AuthFormConst.PASS}
              rules={loginValidation}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
          <Typography color="error" variant="body1">
            &nbsp;{serverError || ''}
          </Typography>
          <Button fullWidth variant="contained" type="submit" disabled={isLoading || !!disableSubmission}>
            {isLoading ? <CircularProgress size={20} /> : AuthFormConst.BUTTON_AUTH}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AuthForm;
