import {TransactionItemType} from '@modules/transactions/Type.transactions';
import {FilterValueType} from '@modules/transactions/screens';
import {toIsoFormat} from '@utils';

export function applyFilter(
  transactions: Array<TransactionItemType>,
  filter: FilterValueType,
) {
  switch (filter) {
    case 'unsorted':
      return transactions;
    case 'ascending_name':
      return transactions.sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name),
      );
    case 'descending_name':
      return transactions
        .sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name))
        .reverse();
    case 'date_newest':
      return transactions.sort(
        (a, b) =>
          // @ts-ignore
          new Date(toIsoFormat(a.completed_at)) -
          // @ts-ignore
          new Date(toIsoFormat(b.completed_at)),
      );
    case 'date_oldest':
      return transactions
        .sort(
          (a, b) =>
            // @ts-ignore
            new Date(toIsoFormat(a.completed_at)) -
            // @ts-ignore
            new Date(toIsoFormat(b.completed_at)),
        )
        .reverse();
    default:
      return transactions;
  }
}
