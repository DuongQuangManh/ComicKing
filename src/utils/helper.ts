import { getCurrentRouter, goBack, navigate } from "@navigations"
import { store } from "@redux/store"

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
}