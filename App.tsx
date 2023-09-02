import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { Stacknavigation } from '@navigations';
import { PaperProvider } from 'react-native-paper';
import { myTheme } from '@utils';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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
