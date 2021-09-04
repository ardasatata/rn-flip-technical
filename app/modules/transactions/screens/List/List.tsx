import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView} from 'react-native';

import styles from './List.style';
import {SearchBar, TransactionItem} from '@modules/transactions/components';
import {
  DefaultFilter,
  EXAMPLE_DATA,
  FilterItemType,
  ListScreenProps,
  RADIO_BUTTON_FILTER,
  SEARCH_PLACEHOLDER,
  SearchKeys,
} from '@modules/transactions/Type.transactions';
import {VStack} from '@components';
import {Colors, Layout, Roundness, Spacing} from '@styles';
import {searchFromArray} from '@utils';
import {TransactionsApi} from '@modules/transactions/api/transactions-api';

import Modal from 'react-native-modal';
// @ts-ignore
import RadioButtonRN from 'radio-buttons-react-native';

import {Api} from '@services/api/api';
import Spacer from '@components/Spacer';
import {applyFilter} from '@modules/transactions/utils';

export const List: React.FC<ListScreenProps> = ({navigation}) => {
  const [transactions, setTransactions] = useState<any>(EXAMPLE_DATA);
  const [transactionsResponses, setTransactionResponses] =
    useState<any>(EXAMPLE_DATA);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeFilter, setActiveFilter] =
    useState<FilterItemType>(DefaultFilter);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSearchValueChange = useCallback(value => {
    setSearchValue(value);
  }, []);

  const goToDetail = useCallback(transaction => {
    navigation.navigate('detail', {
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
      setTransactionResponses(transactions_res.transactions);
      setTransactions(transactionsResponses);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onSearchFilterChanged = () => {
    const searchResult = searchFromArray(
      transactionsResponses,
      searchValue,
      SearchKeys,
    );
    setTransactions(applyFilter(searchResult, activeFilter.value));
  };

  useEffect(() => {
    closeModal();
    onSearchFilterChanged();
  }, [activeFilter, searchValue]);

  return (
    <SafeAreaView>
      <VStack top={Spacing[8]} horizontal={Spacing[12]}>
        <SearchBar
          placeholder={SEARCH_PLACEHOLDER}
          onPressFilter={toggleModal}
          onSearchValueChange={onSearchValueChange}
          filterLabel={activeFilter.label}
        />
        <Spacer height={Spacing[8]} />
      </VStack>
      <FlatList
        ItemSeparatorComponent={() => <Spacer height={Spacing[4]} />}
        ListFooterComponent={() => <Spacer height={Spacing[64]} />}
        style={[Layout.heightFull, styles.listContent]}
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
            data={RADIO_BUTTON_FILTER}
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
