import {StyleSheet} from 'react-native';
import {Colors, Roundness, Spacing} from '@styles';

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: Spacing[36],
    padding: 10,
    // width: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: Roundness.sm,
  },
  filterText: {
    color: Colors.ORANGE500,
  },
});

export default styles;
