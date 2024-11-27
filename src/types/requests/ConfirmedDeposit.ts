import { FinancialProduct } from '../FinancialProduct';

export interface ConfirmedDeposit {
  createdAt: string;
  amount?: number;
  isNewClient: boolean | null;
  isSuccessfullySelected: boolean;
  clientBirthDate?: string;
  financialProduct: FinancialProduct | null;
}
