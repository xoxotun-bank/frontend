/* eslint-disable i18n/no-russian-character */
export interface ClientData {
  categories: ClientCategory[];
  name: string;
  birthDate?: string;
  passport: string;
}

export enum ClientCategory {
  CLIENT = 'Клиент',
  EMPLOYEE = 'Сотрудник'
}

export interface PaymentsTable {
  payments: Payment[];
}

export interface Payment {
  date: string;
  paymentAmount: number;
  percent: number;
  daysAmount: number;
}
