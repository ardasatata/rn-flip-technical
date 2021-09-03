import {
  TransactionItemProps,
  TransactionStatusType,
} from '@modules/transactions/Type.transactions';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors, Roundness, Spacing} from '@styles';
import {formatter, toIsoFormat, toTitleCase} from '@utils';
import {HStack, VStack} from '@components';
import React from 'react';
import styles from '@modules/transactions/components/TransactionItem/TransactionItem.style';
import Spacer from '@components/Spacer';

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

  const StatusTag = ({label}: {label: TransactionStatusType}) => {
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
          {`${toTitleCase(label)}`}
        </Text>
      </VStack>
    );
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
