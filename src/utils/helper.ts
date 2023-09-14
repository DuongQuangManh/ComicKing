import { getCurrentRouter, goBack, navigate } from "@navigations"
import { store } from "@redux/store"
import { Platform, PermissionsAndroid } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
export const helper = {
    // you can pass 'message' param only
    showErrorMsg: (
        message: string,
        onPress: () => void = goBack,
        title: string = 'Message'
    ) => {
        helper.hideLoading()
        navigate('message', { message, msgType: 'error', title, onOk: onPress })
    },
    showSuccessMsg: (
        message: string,
        onPress: () => void = goBack,
        title: string = 'Message'
    ) => {
        navigate('message', { message, msgType: 'success', title, onOk: onPress })
    },
    showConfirmMsg: (
        message: string,
        onOk: () => void,
        onCancel: () => void = goBack,
        title: string = 'Message'
    ) => {
        navigate('confirmMessage', { message, onOk, onCancel, title })
    },
    showLoading: () => {
        navigate('loading')
    },
    hideLoading: () => {
        if (getCurrentRouter() == 'loading') goBack()
    },
    showFlashMsg: () => {

    },
    getAccessToken: () => {
        return store.getState()?.authSlice?.token
    },
    checkPermission: async (imagePicker:()=>void) => {
        if (Platform.OS === 'android') {
          const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
          const hasPermission = await check(permission);
          if (hasPermission === RESULTS.GRANTED) {
            imagePicker()
          } else {
            const status = await request(permission);
            if (status === RESULTS.GRANTED) {
                imagePicker()
            } else {
              helper.showErrorMsg("Vui lòng cấp quyền truy cập ảnh")
            }
          }
        } else {
            imagePicker()
        }
    },
    getGender:(id: string) => {
        if (id === '1') {
          return 'male';
        } else if (id === '2') {
          return 'female';
        } else {
          return 'none';
        }
    },
    getGenderId:(value: string) =>{
        if (value === 'male') {
            return '1';
        } else if (value === 'female') {
            return '2';
        } else {
            return '3';
        }
    }
}