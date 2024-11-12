export interface FinProductsRequest {
  sum: number;
  periods: string[];
  categories: string[];
  canDeposit: boolean | string;
  canWithdrawal: boolean | string;
  capitalizationToSameAccount: boolean | string;
  capitalizationPeriods: string[];
  currency: string;
}
