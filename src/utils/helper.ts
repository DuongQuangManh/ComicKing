import { getCurrentRouter, goBack, navigate } from "@navigations"

export const helper = {
    // you can pass 'message' param only
    showMsg: (
        message: string,
        onPress: () => void = goBack,
        msgType: 'error' | 'success' = 'error',
        title: string = 'Message'
    ) => {
        navigate('message', { message, msgType, title, onOk: onPress })
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