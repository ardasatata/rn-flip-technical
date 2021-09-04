import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
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
import {Colors, Layout, Roundness, Spacing} from '@styles';
import {properDate, searchFromArray, toIsoFormat, toTitleCase} from '@utils';
import {TransactionsApi} from '@modules/transactions/api/transactions-api';

import Modal from 'react-native-modal';
import RadioButtonRN from 'radio-buttons-react-native';

import {Api} from '@services/api/api';
import Spacer from '@components/Spacer';
import {applyFilter} from '@modules/transactions/utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigatorParamList} from '../../../../navigators/AppNavigator';
import {RouteProp} from '@react-navigation/native';

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

const data: Array<FilterItemType> = [
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

type Props = {
  navigation: StackNavigationProp<NavigatorParamList, 'list'>;
};

export const List: React.FC<Props> = ({navigation}) => {
  const [transactions, setTransactions] = useState<any>(EXAMPLE_DATA);
  const [transactionsResponses, setTransactionResponses] =
    useState<any>(EXAMPLE_DATA);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterItemType>({
    label: 'URUTKAN',
    value: 'unsorted',
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSearchValueChange = useCallback(value => {
    console.log('LIST');
    console.log(value);
    setSearchValue(value);
    console.log(value);
  }, []);

  const goToDetail = useCallback(transaction => {
    navigation.navigate('detail', {
      itemId: 86,
      otherParam: 'anything you want here',
      transaction,
    });
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const onFilterSelected = useCallback(e => {
    setActiveFilter(e);
  }, []);

  const api = new Api();
  api.setup();
  const transactionApi = new TransactionsApi(api);

  const fetchTransactions = async () => {
    setRefreshing(true);
    const transactions_res = await transactionApi.getTransactions();
    if (transactions_res.kind === 'ok') {
      // console.log(transactions_res.transactions);
      setTransactionResponses(transactions_res.transactions);
      setTransactions(transactionsResponses);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onSearchFilterChanged = () => {
    console.log(searchValue);
    const searchResult = searchFromArray(transactionsResponses, searchValue, [
      'beneficiary_name',
      'sender_bank',
      'beneficiary_bank',
      'amount',
    ]);
    console.log('onSearchFilterChanged');
    console.log(searchResult);
    setTransactions(applyFilter(searchResult, activeFilter.value));
  };

  useEffect(() => {
    closeModal();
    onSearchFilterChanged();
  }, [activeFilter, searchValue]);

  return (
    <SafeAreaView>
      <SearchBar
        placeholder={SEARCH_PLACEHOLDER}
        onPressFilter={toggleModal}
        onSearchValueChange={onSearchValueChange}
      />
      <FlatList
        style={[Layout.heightFull]}
        data={transactions}
        renderItem={({item}) => (
          <TransactionItem transaction={item} onPressItem={goToDetail} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchTransactions}
          />
        }
      />

      <Modal isVisible={isModalVisible}>
        <VStack
          vertical={Spacing[24]}
          horizontal={Spacing[8]}
          style={{backgroundColor: Colors.WHITE, borderRadius: Roundness.md}}>
          <RadioButtonRN
            data={data}
            selectedBtn={onFilterSelected}
            box={false}
            circleSize={Spacing[12]}
            deactiveColor={Colors.ORANGE500}
            activeColor={Colors.ORANGE500}
            textStyle={{fontWeight: 'bold'}}
            boxStyle={{marginBottom: Spacing[12]}}
          />
          <Spacer height={Spacing[8]} />
        </VStack>
      </Modal>
    </SafeAreaView>
  );
};
