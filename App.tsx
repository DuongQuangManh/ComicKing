import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { Stacknavigation } from '@navigations';
import { PaperProvider } from 'react-native-paper';
import { myTheme } from '@utils';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={myTheme}>
        <Stacknavigation />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
