import {Text} from 'react-native';
import {toTitleCase} from '@utils';
import React from 'react';
import styles from './BankConnection.style';
import {BankConnectionProps} from '@modules/transactions/Type.transactions';

const BankConnection = ({from, to}: BankConnectionProps) => {
  return (
    <Text style={styles.bankConnectionText}>{`${toTitleCase(
      from,
    )} ➔ ${toTitleCase(to)}`}</Text>
  );
};

export default BankConnection;

BankConnection.defaultProps = {
  from: 'BNI',
  to: 'BCA',
};
