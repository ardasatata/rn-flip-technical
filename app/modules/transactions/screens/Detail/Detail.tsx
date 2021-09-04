import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './Detail.style';
import {NavigatorParamList} from '@navigators/AppNavigator';
import {VStack, HStack} from '@components';
import {formatter, toIsoFormat} from '@utils';
import BankConnection from '@modules/transactions/components/BankConnection/BankConnection';
import {Spacing, useTheme, Layout} from '@styles';
// @ts-ignore
import CopyIcon from '@assets/icons/copy.svg';
import Spacer from '@components/Spacer';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  navigation: StackNavigationProp<NavigatorParamList, 'detail'>;
  route: RouteProp<NavigatorParamList, 'detail'>;
};

export const Detail: React.FC<Props> = ({route, navigation}) => {
  const {transaction} = route.params;
  const theme = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const copyIDToClipboard = () => {
    Clipboard.setString(transaction.id);
  };

  useEffect(() => {}, []);

  const ValueWrapper = ({value = '', rightContent = <></>}) => {
    return (
      <HStack
        horizontal={Spacing[24]}
        vertical={Spacing[16]}
        style={styles.valueWrapper}>
        <Text style={styles.valueWrapperText}>{value}</Text>
        {rightContent}
      </HStack>
    );
  };

  const CopyElement = () => {
    return (
      <TouchableOpacity onPress={copyIDToClipboard}>
        <VStack left={Spacing[8]}>
          <CopyIcon
            width={Spacing[20]}
            height={Spacing[20]}
            stroke={theme.colors.primaryColor}
          />
        </VStack>
      </TouchableOpacity>
    );
  };

  const CloseElement = () => {
    return (
      <TouchableOpacity
        style={[Layout.widthFull, Layout.flex]}
        onPress={goBack}>
        <HStack>
          <Spacer />
          <Text style={styles.closeText}>Tutup</Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  const ItemInfoElementItem = ({
    title,
    value,
  }: {
    title: string;
    value: string | number;
  }) => {
    return (
      <VStack
        style={[Layout.flex, styles.itemInfoWrapper]}
        bottom={Spacing[12]}>
        <Text style={styles.itemInfoTitle}>{title}</Text>
        <Text style={styles.itemInfoValue}>{value}</Text>
      </VStack>
    );
  };

  return (
    <SafeAreaView style={styles.screenBackground}>
      <Spacer height={Spacing[12]} />
      <ValueWrapper
        value={`ID Transaksi: #${transaction.id}`}
        rightContent={<CopyElement />}
      />
      <ValueWrapper
        value={'Detail Transaksi'.toUpperCase()}
        rightContent={<CloseElement />}
      />
      <VStack horizontal={Spacing[24]} vertical={Spacing[24]}>
        <HStack>
          <BankConnection />
        </HStack>
        <VStack
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start', // if you want to fill rows left to right
          }}>
          <ItemInfoElementItem
            title={`- ${transaction.beneficiary_name}`}
            value={transaction.account_number}
          />
          <ItemInfoElementItem
            title={'Nominal'}
            value={formatter.format(transaction.amount)}
          />
          <ItemInfoElementItem
            title={'Berita Transfer'}
            value={transaction.remark}
          />
          <ItemInfoElementItem
            title={'Kode Unik'}
            value={transaction.unique_code}
          />
          <ItemInfoElementItem
            title={'Waktu Dibuat'}
            value={new Date(
              toIsoFormat(transaction.created_at),
            ).toLocaleDateString()}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
