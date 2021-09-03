import React from 'react';
import {View} from 'react-native';
import {Layout} from '@styles';

interface Props {
  width?: number;
  height?: number;
}

const Spacer = ({width, height}: Props) => {
  if (width) {
    return <View style={{width}} />;
  }

  if (height) {
    return <View style={{height}} />;
  }

  return <View style={Layout.flex} />;
};

Spacer.defaultProps = {
  width: undefined,
  height: undefined,
  topSafeAreaHeight: undefined,
  bottomSafeAreaHeight: undefined,
};

export default Spacer;
