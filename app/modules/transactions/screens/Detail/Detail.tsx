import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './Detail.style';
import {NavigatorParamList} from '../../../../navigators/AppNavigator';

type Props = {
  navigation: StackNavigationProp<NavigatorParamList, 'detail'>;
  route: RouteProp<NavigatorParamList, 'detail'>;
};

export const Detail: React.FC<Props> = ({route, navigation}) => {
  const {transaction} = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(transaction);
  }, []);

  return (
    <SafeAreaView style={styles.screenBackground}>
      <Button onPress={goBack} title={'cok'}>
        COK
      </Button>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screenBackground}>
        <Header />
        <Text>{transaction.beneficiary_name}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
