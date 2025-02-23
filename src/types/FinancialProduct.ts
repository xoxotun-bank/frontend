export interface FinancialProduct {
  id: number;
  name: string;
  percent: number;
  category: string;
  period: number;
  currency: string;
  canDeposit: boolean;
  canWithdrawal: boolean;
  capitalizationToSameAccount: boolean;
  capitalizationPeriod: string;
}
