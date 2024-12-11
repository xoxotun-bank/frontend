export interface FilterParams {
  sum: number;
  currency: string;
  periods: string[];
  capitalizationPeriods: string[];
  canWithdrawal: boolean | string;
  canDeposit: boolean | string;
  capitalizationToSameAccount: boolean | string;
}
