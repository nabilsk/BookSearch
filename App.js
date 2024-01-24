import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import {store} from './src/redux/store';
import SearchScreen from './src/screens/SearchScreen';

const App = () => {
  return (
    <StoreProvider store={store}>
      <>
        <SearchScreen />
        <FlashMessage position="top" />
      </>
    </StoreProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
