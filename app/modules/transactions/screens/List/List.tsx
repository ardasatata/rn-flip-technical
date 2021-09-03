import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from './List.style';
import {SearchBar, TransactionItem} from '@modules/transactions/components';
import {
  TransactionItemType,
  TransactionStatusType,
} from '@modules/transactions/Type.transactions';
import {HStack, VStack} from '@components';
import {Layout, Roundness, Spacing} from '@styles';
import {properDate, toIsoFormat, toTitleCase} from '@utils';
import {TransactionsApi} from '@modules/transactions/api/transactions-api';

import {Api} from '@services/api/api';

const EXAMPLE_DATA: Array<TransactionItemType> = [
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

const SEARCH_PLACEHOLDER = 'Cari nama,bank,atau nominal';

export const List: React.FC = ({}) => {
  const [transactions, setTransactions] = useState<any>(EXAMPLE_DATA);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const api = new Api();
  api.setup();
  const transactionApi = new TransactionsApi(api);

  const fetchTransactions = async () => {
    setRefreshing(true);
    const transactions_res = await transactionApi.getTransactions();
    console.log(transactions_res.transactions);
    setTransactions(transactions_res.transactions);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <SafeAreaView>
      {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
      <SearchBar placeholder={SEARCH_PLACEHOLDER} />
      <FlatList
        style={[Layout.heightFull]}
        data={transactions}
        renderItem={({item}) => <TransactionItem transaction={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchTransactions}
          />
        }
      />
    </SafeAreaView>
  );
};
