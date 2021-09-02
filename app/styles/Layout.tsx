import {StyleSheet} from 'react-native';

const LayoutStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexCenter: {
    alignItems: 'center',
  },
  flexTrailing: {
    alignItems: 'flex-end',
  },
  flexMid: {
    justifyContent: 'center',
  },
  flexBottom: {
    justifyContent: 'flex-end',
  },
  flexCenterMid: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexWrapTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  widthFull: {
    width: '100%',
  },
  heightFull: {
    height: '100%',
  },
});

export default LayoutStyles;
