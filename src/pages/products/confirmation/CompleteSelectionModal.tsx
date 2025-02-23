import React, { FC } from 'react';

import ErrorOutlinIcon from '@mui/icons-material/ErrorOutline';
import { Button, DialogActions, DialogTitle, Stack, Typography } from '@mui/material';
import { ConfirmedDeposit } from 'src/types/requests/ConfirmedDeposit';

import TitledContainer from 'src/shared/components/TitledContainer';
import { TutorModeComponent } from 'src/shared/components/tutorial/TutorModeComponent';

import { depositCardConst, tutorialConst } from 'shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';
import { useClientState } from 'src/store/hooks/useClientState';
import { useProductState } from 'src/store/hooks/useProductState';

interface Props {
  params: ConfirmedDeposit;
}

const CompleteSelectionModal: FC<Props> = ({ params }) => {
  const { goToNextClient } = useClientState();
  const { postAnalytics } = useAnalyticsState();
  const { resetProduct } = useProductState();

  const confirm = (isSuccess: boolean) => {
    const analyticsParams: ConfirmedDeposit = {
      ...params,
      isSuccessfullySelected: isSuccess
    };
    postAnalytics(analyticsParams);
    resetProduct();
    goToNextClient();
  };

  return (
    <TitledContainer icon={<ErrorOutlinIcon />} label={depositCardConst.MODAL}>
      <TutorModeComponent label={tutorialConst.DEPOSIT_CONFIRMED}>
        <DialogTitle>
          <Typography>{depositCardConst.MODAL_TEXT}</Typography>
        </DialogTitle>
      </TutorModeComponent>
      <DialogActions>
        <Stack spacing={2} width={'100%'}>
          <Button fullWidth onClick={() => confirm(true)} variant="contained">
            {depositCardConst.MODAL_BUTTON}
          </Button>
          <Button fullWidth onClick={() => confirm(false)} variant="outlined">
            {depositCardConst.MODAL_BUTTON_1}
          </Button>
        </Stack>
      </DialogActions>
    </TitledContainer>
  );
};

export default CompleteSelectionModal;
