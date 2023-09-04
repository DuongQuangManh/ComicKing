// list name of routes of rootStack
export type ScreensName = keyof StackParamList

// add route name and params every time you add new screen to rootStack
// if is non params set to undefined
export type StackParamList = {
    login: { email?: string, password?: string },
    forgotPassword: undefined,
    register: undefined,
    otpVerification: {
        verifyAction: 'login' | 'register' | 'forgotPass' | 'changePass',
        message: string,
        email: string
    },
    changePassword: undefined,
    splash: undefined,
    message: {
        onOk: () => void,
        title: string,
        message: string,
        msgType: 'error' | 'success'
    },
    loading: undefined,
    home: undefined
}