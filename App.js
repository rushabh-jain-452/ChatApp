/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Providers from './src/navigation';

const App: () => Node = () => {

  return (
    // <SafeAreaView>
      <Providers />
    // </SafeAreaView>
  );
};


export default App;
