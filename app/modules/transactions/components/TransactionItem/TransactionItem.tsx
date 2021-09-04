import {
  TransactionItemProps,
  TransactionStatusType,
} from '@modules/transactions/Type.transactions';
import {Text, TouchableOpacity, View} from 'react-native';
import {Spacing} from '@styles';
import {formatter, toIsoFormat, toTitleCase} from '@utils';
import {HStack, VStack} from '@components';
import React from 'react';
import styles from '@modules/transactions/components/TransactionItem/TransactionItem.style';
import Spacer from '@components/Spacer';
import BankConnection from '@modules/transactions/components/BankConnection/BankConnection';

const TransactionItem = ({transaction, onPressItem}: TransactionItemProps) => {
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

  const StatusTag = ({label}: {label: TransactionStatusType}) => {
    const tagLabel = label === 'SUCCESS' ? 'Berhasil' : 'Pengecekan';

    return (
      <VStack
        horizontal={Spacing[8]}
        vertical={Spacing[2]}
        style={[
          styles.tagBase,
          label === 'SUCCESS' ? styles.tagSuccess : styles.tagPending,
        ]}>
        <Text
          style={[
            styles.tagText,
            label === 'SUCCESS' ? styles.tagTextSuccess : {},
          ]}>
          {`${toTitleCase(tagLabel)}`}
        </Text>
      </VStack>
    );
  };

  return (
    <TouchableOpacity onPress={() => onPressItem(transaction)}>
      <HStack style={styles.itemWrapper} right={Spacing[12]}>
        <LeftAccent status={transaction.status} />
        <Spacer width={Spacing[12]} />
        <VStack vertical={Spacing[12]}>
          <BankConnection
            from={transaction.sender_bank}
            to={transaction.beneficiary_bank}
          />
          <Text>{transaction.beneficiary_name}</Text>
          <Text>{`${formatter.format(transaction.amount)} • ${new Date(
            toIsoFormat(transaction.created_at),
          ).toLocaleDateString()}`}</Text>
        </VStack>
        <Spacer />
        <StatusTag label={transaction.status} />
      </HStack>
    </TouchableOpacity>
  );
};

export default TransactionItem;
