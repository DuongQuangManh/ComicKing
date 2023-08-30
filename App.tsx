import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Stacknavigation from './src/navigations';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Stacknavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
