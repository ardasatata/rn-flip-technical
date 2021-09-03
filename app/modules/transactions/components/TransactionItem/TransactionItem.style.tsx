import {StyleSheet} from 'react-native';
import {Colors, Roundness, Spacing} from '@styles';

const styles = StyleSheet.create({
  tagBase: {
    borderWidth: 2,
    borderRadius: Roundness.sm,
  },
  tagSuccess: {
    borderColor: Colors.GREEN500,
    backgroundColor: Colors.GREEN500,
  },
  tagPending: {
    borderColor: Colors.ORANGE500,
  },
  tagText: {
    fontWeight: 'bold',
  },
  tagTextSuccess: {
    color: Colors.WHITE,
  },
});

export default styles;
