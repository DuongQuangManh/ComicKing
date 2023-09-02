import { goBack, navigate } from "@navigations"

export const helper = {
    // you can pass 'message' param only
    showMessage: (
        message: string,
        onPress: () => void = goBack,
        msgType: 'error' | 'success' = 'error',
        title: string = 'Message'
    ) => {
        navigate('message', { message, msgType, title, onOk: onPress })
    }
}