export type TransactionItemProps = {
  transaction: TransactionItemType;
};

export type TransactionStatusType = 'SUCCESS' | 'PENDING';

export type TransactionItemType = {
  id: string;
  amount: number;
  unique_code: number;
  status: TransactionStatusType;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
};
