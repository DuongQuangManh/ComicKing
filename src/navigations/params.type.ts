// list name of routes of rootStack
export type TScreensName = keyof TStackParamList

// add route name and params every time you add new screen to rootStack
// if is non params set to undefined
export type TStackParamList = {
    login: undefined,
    forgotPassword: undefined,
    register: undefined,
    otpVerification: undefined,
    changePassword: undefined,
    splash: undefined,

}