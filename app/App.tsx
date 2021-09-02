/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {AppNavigator} from './navigators';
import {ThemeProvider, useTheme} from './styles';

const App = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
