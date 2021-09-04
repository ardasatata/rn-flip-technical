import {StyleSheet} from 'react-native';
import {Colors, Spacing} from '@styles';

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: Colors.GRAY100,
  },
  valueWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY200,
  },
  valueWrapperText: {
    fontWeight: 'bold',
  },
  closeText: {
    color: Colors.ORANGE500,
  },
  itemInfoTitle: {
    fontWeight: 'bold',
    lineHeight: Spacing[24],
  },
  itemInfoValue: {
    fontWeight: 'normal',
  },
  itemInfoWrapper: {
    flexBasis: '50%',
  },
});

export default styles;
