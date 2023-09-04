import { getCurrentRouter, goBack, navigate } from "@navigations"

export const helper = {
    // you can pass 'message' param only
    showErrorMsg: (
        message: string,
        onPress: () => void = goBack,
        title: string = 'Message'
    ) => {
        navigate('message', { message, msgType: 'error', title, onOk: onPress })
    },
    showSuccessMsg: (
        message: string,
        onPress: () => void = goBack,
        title: string = 'Message'
    ) => {
        navigate('message', { message, msgType: 'success', title, onOk: onPress })
    },
    showLoading: () => {
        navigate('loading')
    },
    hideLoading: () => {
        if (getCurrentRouter() == 'loading') goBack()
    },
    showFlashMsg: () => {

    }
}