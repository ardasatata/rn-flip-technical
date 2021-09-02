import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
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

import styles from './SearchBar.style';
import {HStack, VStack} from '../../../../components';
import {Spacing, useTheme} from '../../../../styles';

// @ts-ignore
import SearchIcon from '../../../../../assets/icons/search.svg';
// @ts-ignore
import ChevronDown from '../../../../../assets/icons/chevron-down.svg';

import Spacer from '../../../../components/Spacer';

export interface SearchBarProps {
  filterValue: string;
  placeholder: string;
}

export const SearchBar = ({filterValue, placeholder}: SearchBarProps) => {
  const theme = useTheme();

  return (
    <HStack style={[]}>
      <HStack style={styles.inputWrapper}>
        <SearchIcon
          width={Spacing[20]}
          height={Spacing[20]}
          stroke={theme.colors.primaryColor}
        />
        <Spacer width={Spacing[8]} />
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
          placeholder={placeholder}
        />
        <TouchableOpacity>
          <HStack>
            <Text style={styles.filterText}>{filterValue.toUpperCase()}</Text>
            <ChevronDown
              width={Spacing[20]}
              height={Spacing[20]}
              stroke={theme.colors.primaryColor}
            />
          </HStack>
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};

SearchBar.defaultProps = {
  filterValue: 'Urutkan',
};
