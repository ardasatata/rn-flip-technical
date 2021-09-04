import {StackNavigationProp} from '@react-navigation/stack';
import {NavigatorParamList} from '@navigators/AppNavigator';

export type FilterItemType = {
  label: string;
  value: FilterValueType;
};

export type FilterValueType =
  | 'unsorted'
  | 'ascending_name'
  | 'descending_name'
  | 'date_newest'
  | 'date_oldest';

export type ListScreenProps = {
  navigation: StackNavigationProp<NavigatorParamList, 'list'>;
};

export type TransactionItemProps = {
  transaction: TransactionItemType;
  onPressItem(transaction: TransactionItemType): void;
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

export interface BankConnectionProps {
  from: string;
  to: string;
}

export const SearchKeys = [
  'beneficiary_name',
  'sender_bank',
  'beneficiary_bank',
  'amount',
];

export const DefaultFilter = {
  label: 'URUTKAN',
  value: 'unsorted',
};

export const SEARCH_PLACEHOLDER = 'Cari nama,bank,atau nominal';

export const EXAMPLE_DATA: Array<TransactionItemType> = [
  {
    id: 'FT95192',
    amount: 4466982,
    unique_code: 854,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '6563101417',
    beneficiary_name: 'Miranda Bannister',
    beneficiary_bank: 'bca',
    remark: 'sample remark',
    created_at: '2021-09-02 19:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  {
    id: 'FT94967',
    amount: 4466982,
    unique_code: 854,
    status: 'PENDING',
    sender_bank: 'bni',
    account_number: '6563101417',
    beneficiary_name: 'Miranda Bannister',
    beneficiary_bank: 'bca',
    remark: 'sample remark',
    created_at: '2021-08-30 15:38:23',
    completed_at: '2021-09-02 20:37:35',
    fee: 0,
  },
];

export const RADIO_BUTTON_FILTER: Array<FilterItemType> = [
  {
    label: 'URUTKAN',
    value: 'unsorted',
  },
  {
    label: 'Nama A-Z',
    value: 'ascending_name',
  },
  {
    label: 'Nama Z-A',
    value: 'descending_name',
  },
  {
    label: 'Tanggal Terbaru',
    value: 'date_newest',
  },
  {
    label: 'Tanggal Terlama',
    value: 'date_oldest',
  },
];
