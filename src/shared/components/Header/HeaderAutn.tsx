import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Settings } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { changeTutorMode, endTutor, logout, startTutor, useAppDispatch, useAppSelector } from 'src/store';
import { UserRole } from 'src/types';

import { HeaderAuthConst, tutorialConst } from 'src/shared/constants';
import { AppRoutes } from 'src/shared/constants/routes';
import { useClientState } from 'src/store/hooks/useClientState';
import { getUserRole } from 'src/utils/Mappers';

const HeaderAuth = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [needTutorOpen, setNeedTutorOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuth, isTutorMode, flagGuideShown, user } = useAppSelector(({ auth }) => auth);
  const userRole = getUserRole(user);
  const { goToNextClient } = useClientState();

  useEffect(() => {
    !flagGuideShown && userRole === UserRole.OPERATOR && setNeedTutorOpen(true);
  }, [flagGuideShown, userRole]);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const handleMenuOpen = () => setMenuOpen(true);

  const handleMenuClose = () => setMenuOpen(false);

  const handleChangeTutorMode = () => dispatch(changeTutorMode());

  if (!isAuth) return <Navigate to={AppRoutes.AUTHORIZATION} />;

  const handleNeedTutorOpen = () => {
    handleMenuClose();
    setNeedTutorOpen(true);
  };

  const handleCloseTutorDialog = () => {
    setNeedTutorOpen(false);
    dispatch(endTutor());
  };

  const handleRunTutor = () => {
    dispatch(startTutor());
    goToNextClient();
    setNeedTutorOpen(false);
  };

  return (
    <Box>
      <IconButton type="submit" onClick={handleMenuOpen}>
        <Settings />
      </IconButton>
      <Dialog
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            position: 'fixed',
            top: 40,
            right: 300,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
            padding: '20px'
          }
        }}
      >
        <DialogActions>
          <Stack spacing={1}>
            {!userRole.includes(UserRole.ADMIN) && (
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" onClick={handleChangeTutorMode}>
                  <Typography>{tutorialConst.TURTOR_MODE}</Typography>
                  <Switch checked={isTutorMode} />
                </Stack>
                <Button onClick={handleNeedTutorOpen} color="primary" size="small">
                  {tutorialConst.RUN_TUTOR}
                </Button>
                <Divider />
              </Stack>
            )}
            <Button onClick={handleLogout} color="error" size="small">
              {HeaderAuthConst.BUTTON_EXIT}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      <Dialog
        open={needTutorOpen}
        onClose={handleCloseTutorDialog}
        PaperProps={{
          sx: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px'
          }
        }}
      >
        <DialogTitle variant="h6">{tutorialConst.IS_TUTOR_NEEDED}</DialogTitle>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleRunTutor} type="submit" variant="contained">
              {HeaderAuthConst.YES}
            </Button>
            <Button onClick={handleCloseTutorDialog} type="submit" variant="outlined">
              {HeaderAuthConst.NO}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HeaderAuth;
