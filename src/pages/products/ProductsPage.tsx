import React from 'react';

import { Box } from '@mui/material';

import { useClientState } from 'src/store/hooks/useClientState';

import CalculatorPage from './calculator/CalculatorPage';
import ConfirmationPage from './confirmation/ConfirmationPage';
import { IdentifyClientPage } from './identify-client/IdentifyClientPage';
import { ProductsPageNavigation } from './ProductsPageNavigation';

interface PageComponents {
  [key: number]: JSX.Element;
}

const pageComponents: PageComponents = {
  0: <IdentifyClientPage />,
  1: <CalculatorPage />,
  2: <ConfirmationPage />
};

const ProductsPage = () => {
  const { step } = useClientState();

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ height: 'calc(100% - 58px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {pageComponents[step]}
      </Box>
      <ProductsPageNavigation step={step} />
    </Box>
  );
};

export default ProductsPage;
