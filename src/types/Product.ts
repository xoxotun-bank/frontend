import { FinancialProduct } from './FinancialProduct';

export interface Product {
  financialProduct: FinancialProduct;
  profit: number;
  profitInPercent: number;
  matchesParameters: {
    period: boolean;
    canDeposit: boolean;
    canWithdrawal: boolean;
    capitalizationToSameAccount: boolean;
    capitalizationPeriod: boolean;
  };
}
