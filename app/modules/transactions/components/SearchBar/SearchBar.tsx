import React, {useCallback, useEffect, useState} from 'react';
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
import {HStack, VStack} from '@components';
import {Spacing, useTheme} from '@styles';

// @ts-ignore
import SearchIcon from '@assets/icons/search.svg';
// @ts-ignore
import ChevronDown from '@assets/icons/chevron-down.svg';

import Spacer from '@components/Spacer';
import {useDebounce} from '@utils';

export interface SearchBarProps {
  placeholder: string;
  onPressFilter(): void;
  filterLabel: string;
  onSearchValueChange(str: string | number): void;
}

export const SearchBar = ({
  placeholder,
  filterLabel,
  onPressFilter,
  onSearchValueChange,
}: SearchBarProps) => {
  const theme = useTheme();

  const [searchVal, setSearchval] = useState<string>('');
  const debouncedSearchVal = useDebounce(searchVal, 500);

  useEffect(() => {
    onSearchValueChange(debouncedSearchVal);
  }, [debouncedSearchVal]);

  const onChangeText = useCallback(value => {
    setSearchval(value);
  }, []);

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
          onChangeText={onChangeText}
          value={searchVal}
          placeholder={placeholder}
        />
        <TouchableOpacity onPress={onPressFilter}>
          <HStack>
            <Text style={styles.filterText}>{filterLabel.toUpperCase()}</Text>
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
  filterLabel: 'Urutkan',
  onSearchValueChange(str: string) {
    return null;
  },
};
