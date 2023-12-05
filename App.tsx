import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from '@redux/store';
import {Stacknavigation} from '@navigations';
import {PaperProvider} from 'react-native-paper';
import {myTheme} from '@utils';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import {
  getFirebaseToken,
  handleFirebaseNotification,
  requestUserPermission,
  setupPushLocalNotification,
} from '@notification/index';
import {setFirebaseToken} from '@redux/authSlice';
import {getCountNewNotification} from '@redux/notificationSlice';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'new NativeEventEmitter',
]);

function App(): JSX.Element {
  const handleWhenNotificationClick = (notification: any) => {
    console.log(' handleWhenNotificationClick ', JSON.stringify(notification));
    if (notification) {
    }
  };
  const handleActionWhenReceivceNotificationInForceround = () => {
    const userId = store.getState().userSlice.document?.id;
    if (userId) store.dispatch(getCountNewNotification({userId}));
  };
  const notificationHandler = async () => {
    try {
      await requestUserPermission();
      if (!store.getState()?.authSlice?.firebaseToken) {
        let firebaseToken = await getFirebaseToken();
        store.dispatch(setFirebaseToken(firebaseToken));
      }

      setupPushLocalNotification(handleWhenNotificationClick);
      handleFirebaseNotification(
        handleActionWhenReceivceNotificationInForceround,
        handleWhenNotificationClick,
      );
    } catch (error) {
      console.error('initNotificationHandler ', error);
    }
  };

  useEffect(() => {
    notificationHandler();
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={myTheme}>
        <PersistGate persistor={persistor}>
          <Stacknavigation />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

export default App;
