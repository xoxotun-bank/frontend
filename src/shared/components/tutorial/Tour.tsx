import React, { FC, useEffect, useState } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

import { endTutor, setStep, useAppDispatch } from 'src/store';
import { setProduct } from 'src/store/slices/productSlice';

import {
  exampleProductConst,
  IdentifyClientConstants,
  joyrideActionsTranslation,
  tutorialConst
} from 'src/shared/constants';
import { useClientState } from 'src/store/hooks/useClientState';

interface StepsForPage {
  [key: number]: Step[];
}

const stepsForPage: StepsForPage = {
  0: [
    {
      target: '.search-client',
      content: tutorialConst.IDENTIFICATION_GUIDE,
      title: IdentifyClientConstants.IDENTIFICATION,
      showProgress: false,
      hideCloseButton: true,
      showSkipButton: false
    },
    {
      target: '.null',
      content: ''
    }
  ],
  1: [
    {
      target: '.filters',
      content: tutorialConst.MAIN_PARAMS_INFO,
      title: tutorialConst.DEPOSIT_SELECTION,
      disableBeacon: true,
      showProgress: false,
      hideCloseButton: true,
      showSkipButton: false
    },
    {
      target: '.list',
      content: tutorialConst.DEPOSIT_LIST_GUIDE,
      title: tutorialConst.DEPOSIT_SELECTION,
      disableBeacon: true,
      hideBackButton: true,
      showProgress: false,
      hideCloseButton: true,
      showSkipButton: false
    },
    {
      target: '.null',
      content: ''
    }
  ],
  2: [
    {
      target: '.clientCard',
      content: tutorialConst.CLIENT_CARD_GUIDE,
      title: tutorialConst.CONFIRM_DEPOSIT,
      disableBeacon: true,
      showProgress: false,
      hideCloseButton: true,
      showSkipButton: false
    },
    {
      target: '.depositCard',
      content: tutorialConst.DEPOSIT_CARD_GUIDE,
      title: tutorialConst.CONFIRM_DEPOSIT,
      disableBeacon: true,
      showProgress: false,
      hideCloseButton: true,
      showSkipButton: false,
      hideBackButton: true
    }
  ]
};

const exampleProduct = {
  financialProduct: {
    id: 1,
    name: exampleProductConst.DEPOSIT_NAME,
    percent: 9.4,
    category: exampleProductConst.CLIENT,
    period: 1098,
    currency: 'RUB',
    canDeposit: true,
    canWithdrawal: false,
    capitalizationToSameAccount: true,
    capitalizationPeriod: exampleProductConst.PERIOD
  },
  profit: 32518.38,
  profitInPercent: 31.73
};

const joyrideStyles = {
  options: {
    arrowColor: 'white',
    backgroundColor: 'white',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    primaryColor: 'rgba(254,80,0,1)',
    textColor: 'black',
    zIndex: 1000
  },
  buttonNext: {
    color: 'white'
  },
  buttonBack: {
    marginRight: 10
  },
  buttonSkip: {
    color: 'rgba(254,80,0,1)'
  }
};

const Tour: FC = () => {
  const { step, continueWithClientType } = useClientState();
  const dispatch = useAppDispatch();
  const [tourSteps, setTourSteps] = useState<Step[]>(stepsForPage[0]);
  const [run, setRun] = useState(false);
  const { goToNextClient } = useClientState();

  useEffect(() => {
    setTourSteps(stepsForPage[step]);
    setRun(true);
  }, [step]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === 'finished' || status === 'skipped') {
      setRun(false);
      if (step === 0) {
        continueWithClientType();
      } else if (step === 1) {
        dispatch(setProduct(exampleProduct));
        dispatch(setStep(2));
      } else if (step === 2) {
        dispatch(endTutor());
        goToNextClient();
      }
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleJoyrideCallback}
      styles={joyrideStyles}
      locale={{
        back: joyrideActionsTranslation.BACK,
        close: joyrideActionsTranslation.CLOSE,
        last: joyrideActionsTranslation.LAST,
        next: joyrideActionsTranslation.NEXT,
        skip: joyrideActionsTranslation.SKIP
      }}
    />
  );
};

export default Tour;
