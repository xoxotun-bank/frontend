/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useCallback, useMemo, useState } from 'react';

import { CreditCard } from '@mui/icons-material';
import { Box } from '@mui/material';
import allMatchingIcon from 'src/assets/allMatchingIcon.png';
import notAllMatchingIcon from 'src/assets/notAllMatchingIcon.png';
import TitledContainer from 'src/shared/layouts/TitledContainer';

import { DepositListPreloader } from 'src/shared/components';

import { ProductsPageConstants } from 'src/shared/constants/localeConstants';
import { useProductState } from 'src/store/hooks/useProductState';

import Deposit from './Deposit';
import './Deposit.css';
import { EmptyDepositsList } from './EmptyDepositsList';

const DepositList: FC = () => {
  const { isProductsLoading, products, productsError } = useProductState();
  const [selectedDeposits, setSelectedDeposits] = useState<Record<string, boolean>>({});

  const handleToggleSelect = useCallback((id: number) => {
    setSelectedDeposits((prevSelectedDeposits) => ({
      ...prevSelectedDeposits,
      [id]: !prevSelectedDeposits[id]
    }));
  }, []);

  // TODO посмотреть что не так
  const sortedProducts = useMemo(() => {
    const selected =
      products?.products.filter(
        (product: { financialProduct: { id: string | number } }) => selectedDeposits[product.financialProduct.id]
      ) || [];
    const unselected =
      products?.products.filter(
        (product: { financialProduct: { id: string | number } }) => !selectedDeposits[product.financialProduct.id]
      ) || [];
    return [...selected, ...unselected];
  }, [products, selectedDeposits]);

  return (
    <Box className="list" sx={{ minWidth: '700px' }}>
      <TitledContainer
        icon={<CreditCard />}
        label={ProductsPageConstants.AVAILABLE_DEPOSITS}
        sx={{ flex: '1', height: '100%' }}
        legend={[
          { icon: <img src={allMatchingIcon} />, text: ProductsPageConstants.PROOF_DEPOSIT },
          { icon: <img src={notAllMatchingIcon} />, text: ProductsPageConstants.DISPROOF_DEPOSIT }
        ]}
      >
        {isProductsLoading ? (
          [0, 1, 2].map((_, i) => <DepositListPreloader key={i} />)
        ) : productsError ? (
          <EmptyDepositsList />
        ) : (
          sortedProducts.map(({ financialProduct, profit, profitInPercent, matchesParameters }) => (
            <Deposit
              key={financialProduct.id}
              profit={profit}
              financialProduct={financialProduct}
              profitInPercent={profitInPercent}
              matchesParameters={matchesParameters}
              onToggleSelect={() => handleToggleSelect(financialProduct.id)}
              isSelected={!!selectedDeposits[financialProduct.id]}
            />
          ))
        )}
      </TitledContainer>
    </Box>
  );
};

export default DepositList;
