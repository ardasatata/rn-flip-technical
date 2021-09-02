import React from 'react';
import {
  FlatList,
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
import {SearchBar} from '../../components';
import {
  TransactionItemType,
  TransactionStatusType,
} from '../../Type.transactions';
import {HStack, VStack} from '../../../../components';
import {Layout, Roundness, Spacing} from '../../../../styles';
import {properDate, toIsoFormat, toTitleCase} from '../../../../utils';

const EXAMPLE_RESPONSE = {
  FT94967: {
    id: 'FT94967',
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
  FT26356: {
    id: 'FT26356',
    amount: 1002599,
    unique_code: 507,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '9935204630',
    beneficiary_name: 'Sammy-Jo Mccall',
    beneficiary_bank: 'mandiri',
    remark: 'sample remark',
    created_at: '2021-09-02 19:35:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT69687: {
    id: 'FT69687',
    amount: 3082999,
    unique_code: 244,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '9929496024',
    beneficiary_name: 'Beck Glover',
    beneficiary_bank: 'bri',
    remark: 'sample remark',
    created_at: '2021-09-02 19:34:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT72212: {
    id: 'FT72212',
    amount: 4079218,
    unique_code: 730,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '6268982532',
    beneficiary_name: 'Selin Dawe',
    beneficiary_bank: 'bri',
    remark: 'sample remark',
    created_at: '2021-09-01 16:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT34485: {
    id: 'FT34485',
    amount: 4551657,
    unique_code: 145,
    status: 'PENDING',
    sender_bank: 'bni',
    account_number: '6113341894',
    beneficiary_name: 'Jake Castillo',
    beneficiary_bank: 'mandiri',
    remark: 'sample remark',
    created_at: '2021-08-31 15:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT8840: {
    id: 'FT8840',
    amount: 81084,
    unique_code: 381,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '5414031871',
    beneficiary_name: 'Hal Matthams',
    beneficiary_bank: 'bri',
    remark: 'sample remark',
    created_at: '2021-08-30 14:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT51804: {
    id: 'FT51804',
    amount: 4867951,
    unique_code: 405,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '6527824797',
    beneficiary_name: 'Sammy-Jo Mccall',
    beneficiary_bank: 'btpn',
    remark: 'sample remark',
    created_at: '2021-08-29 13:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT90731: {
    id: 'FT90731',
    amount: 835877,
    unique_code: 201,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '2655447607',
    beneficiary_name: 'Selin Dawe',
    beneficiary_bank: 'mandiri',
    remark: 'sample remark',
    created_at: '2021-08-28 12:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT2039: {
    id: 'FT2039',
    amount: 3124898,
    unique_code: 287,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '5221833019',
    beneficiary_name: 'Selin Dawe',
    beneficiary_bank: 'bri',
    remark: 'sample remark',
    created_at: '2021-08-27 11:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
  FT95192: {
    id: 'FT95192',
    amount: 1173350,
    unique_code: 663,
    status: 'SUCCESS',
    sender_bank: 'bni',
    account_number: '4608679273',
    beneficiary_name: 'Hal Matthams',
    beneficiary_bank: 'btpn',
    remark: 'sample remark',
    created_at: '2021-08-26 10:36:24',
    completed_at: '2021-09-02 19:36:24',
    fee: 0,
  },
};

const EXAMPLE_ITEM: TransactionItemType = {
  id: 'FT94967',
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
};

const EXAMPLE_DATA: Array<TransactionItemType> = [
  {
    id: 'FT94967',
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

export type TransactionItemProps = {
  transaction: TransactionItemType;
};

const TransactionItem = ({transaction}: TransactionItemProps) => {
  const LeftAccent = ({status}: {status: TransactionStatusType}) => {
    const color = status === 'SUCCESS' ? 'green' : 'orange';
    return (
      <View
        style={{
          width: Spacing[8],
          height: '100%',
          backgroundColor: color,
        }}
      />
    );
  };

  const BankConnection = ({from, to}: {from: string; to: string}) => {
    return <Text>{`${toTitleCase(from)} ➔ ${toTitleCase(to)}`}</Text>;
  };

  return (
    <TouchableOpacity>
      <HStack
        style={{
          backgroundColor: 'white',
          borderRadius: Roundness.sm,
          overflow: 'hidden',
          minHeight: Spacing[48],
        }}>
        <LeftAccent status={transaction.status} />
        <VStack>
          <BankConnection
            from={transaction.sender_bank}
            to={transaction.beneficiary_bank}
          />
          <Text>{transaction.beneficiary_name}</Text>
          <Text>{`${transaction.amount} ➔ ${new Date(
            toIsoFormat(transaction.created_at),
          ).toLocaleDateString()}`}</Text>
        </VStack>
        <Text>{transaction.status}</Text>
      </HStack>
    </TouchableOpacity>
  );
};

export const List: React.FC = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SearchBar placeholder={SEARCH_PLACEHOLDER} />
      <FlatList
        style={[Layout.heightFull]}
        data={EXAMPLE_DATA}
        renderItem={({item}) => <TransactionItem transaction={item} />}
      />
    </SafeAreaView>
  );
};
