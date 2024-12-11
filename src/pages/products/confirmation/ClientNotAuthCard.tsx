import React, { useState } from 'react';

import { AccountCircle } from '@mui/icons-material';
import { Avatar, Box, Button, Dialog, Paper, Stack, Typography } from '@mui/material';

import ClientFound from 'src/shared/components/clientIdentity/ClientFound';
import { NewClientModal } from 'src/shared/components/clientIdentity/NewClientModal';
import SearchClient from 'src/shared/components/clientIdentity/SearchClient';
import { TutorModeComponent } from 'src/shared/components/tutorial/TutorModeComponent';

import { clientNotAuthCardConst, tutorialConst } from 'shared/constants';
import { useClientState } from 'src/store/hooks/useClientState';

import styles from './Confirmation.module.css';

const ClientNotAuthCard = () => {
  const { client } = useClientState();
  const [open, setOpen] = useState(false);
  const [openFound, setOpenFound] = useState(false);
  const handleOpenFoundClient = () => setOpenFound(true);

  const handleOpenNewClient = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCloseFound = () => setOpenFound(false);
  return (
    <Box className="clientCard">
      <Paper className={styles.wrapperClient}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {<AccountCircle />}
          <Typography variant="h6">{clientNotAuthCardConst.LABEL}</Typography>
        </Stack>
        <Avatar sx={{ width: 154, height: 154 }}></Avatar>
        <Stack spacing={1}>
          <Typography variant="body1" align="center">
            {clientNotAuthCardConst.LABEL_TEXT}
          </Typography>
          <Typography variant="body2" align="justify" color="#999999">
            {clientNotAuthCardConst.TEXT}
          </Typography>
          <Button fullWidth variant="text" type="submit" onClick={handleOpenFoundClient}>
            {clientNotAuthCardConst.BUTTON_1}
          </Button>
          <TutorModeComponent label={tutorialConst.NEW_CLIENT_INFO}>
            <Button fullWidth variant="contained" type="submit" onClick={handleOpenNewClient}>
              {clientNotAuthCardConst.BUTTON_2}
            </Button>
          </TutorModeComponent>
        </Stack>
        <Dialog open={open} onClose={handleClose}>
          <NewClientModal handleClose={handleClose} />
        </Dialog>
        <Dialog open={openFound} onClose={handleCloseFound}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {client ? <ClientFound /> : <SearchClient />}
          </Box>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ClientNotAuthCard;
