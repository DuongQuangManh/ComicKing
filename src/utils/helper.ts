import {getCurrentRouter, goBack, navigate} from '@navigations';
import {AppDispatch, store} from '@redux/store';
import {Platform, PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Moment from 'moment';
import {
  getHistoryReading,
  getUserInfoAction,
  getUserWalletAction,
} from '@redux/userSlice';
import {
  getDoneComics,
  getHotComic,
  getNewestComicUpdatedChapter,
  getNewestComics,
  getProposeComics,
  getSliderComics,
} from '@redux/homeSlice';
import {getAttendance} from '@redux/attendanceSlice';
export const helper = {
  // you can pass 'message' param only
  showErrorMsg: (
    message: string,
    onPress: () => void = goBack,
    title: string = 'Message',
  ) => {
    helper.hideLoading();
    navigate('message', {message, msgType: 'error', title, onOk: onPress});
  },
  showSuccessMsg: (
    message: string,
    onPress: () => void = goBack,
    title: string = 'Message',
  ) => {
    navigate('message', {message, msgType: 'success', title, onOk: onPress});
  },
  showConfirmMsg: (
    message: string,
    onOk: () => void,
    onCancel: () => void = goBack,
    title: string = 'Message',
  ) => {
    navigate('confirmMessage', {message, onOk, onCancel, title});
  },
  showLoading: () => {
    navigate('loading');
  },
  hideLoading: () => {
    if (getCurrentRouter() == 'loading') goBack();
  },
  showFlashMsg: () => {},
  getAccessToken: () => {
    return store.getState()?.authSlice?.token;
  },
  checkPermission: async (imagePicker: () => void) => {
    if (Platform.OS === 'android') {
      const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      const hasPermission = await check(permission);
      if (hasPermission === RESULTS.GRANTED) {
        imagePicker();
      } else {
        const status = await request(permission);
        if (status === RESULTS.GRANTED) {
          imagePicker();
        } else {
          helper.showErrorMsg('Vui lòng cấp quyền truy cập ảnh');
        }
      }
    } else {
      imagePicker();
    }
  },
  checkCamPermission: () => {
    return new Promise((onOk, onErr) => {
      if (Platform.OS == 'ios') return onOk(true);
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
          result => {
            if (result) {
              onOk(result == true ? true : false);
            } else {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              ).then(result => {
                if (result && result !== 'denied') {
                  onOk(result === 'granted' ? true : false);
                } else {
                  helper.showErrorMsg('Vui lòng cấp quyền truy cập ảnh');
                  onOk(false);
                }
              });
            }
          },
        );
      } else {
        onOk(true);
      }
    });
  },
  getGender: (id: string) => {
    if (id === '1') {
      return 'male';
    } else if (id === '2') {
      return 'female';
    } else {
      return 'none';
    }
  },
  getGenderId: (value: string) => {
    if (value === 'male') {
      return '1';
    } else if (value === 'female') {
      return '2';
    } else {
      return '3';
    }
  },
  convertToK: (value: number) => {
    if (value < 1000) {
      return `${value}`;
    } else {
      const number = value / 1000;
      const roundedNumber = parseFloat(number.toFixed(1));
      return `${roundedNumber}k`;
    }
  },
  checkTime: (currentHour: any) => {
    let timeOfDay = 'Chào bạn';

    if (currentHour < 12) {
      timeOfDay = 'Chào buổi sáng';
    } else if (currentHour < 18) {
      timeOfDay = 'Chào buổi chiều';
    } else {
      timeOfDay = 'Chào buổi tối';
    }
    return timeOfDay;
  },
  clamp: (value: number, lowerBound: number, upperBound: number) => {
    'worklet';
    return Math.min(Math.max(lowerBound, value), upperBound);
  },
  convertTimestamp: (timestamp: number) => {
    const formattedTime = Moment(timestamp).format('HH:mm, DD/MM/YYYY');
    return formattedTime;
  },
  displayMoney: (money: number) => {
    return money.toLocaleString();
  },
  getCurrentDateYYMMDD: () => {
    const todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  },
  getAsset: (dispatch: AppDispatch, userId: string) => {
    dispatch(getUserInfoAction({id: userId}));
    dispatch(getUserWalletAction({userId}));
    dispatch(getSliderComics());
    dispatch(getNewestComics());
    dispatch(getProposeComics());
    dispatch(getDoneComics());
    dispatch(getNewestComicUpdatedChapter());
    dispatch(getHotComic());
    dispatch(getHistoryReading({userId}));
    dispatch(getAttendance(userId));
  },
};
