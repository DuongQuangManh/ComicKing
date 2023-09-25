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
    home: { registerSuccess?: boolean },
    setting: undefined,
    confirmMessage: {
        title: string,
        message: string,
        onOk: () => void,
        onCancel: () => void
    }
    menu: undefined,
    notification: undefined,
    profile:undefined,
    language:undefined,
    nighmode:undefined,
    editprofile:{
        typeAction:'fullname' | 'birthday' | 'gender' |'image'|'nickname',
        value:any,
        message:string,
        label:string,
    },
    search:undefined,
    favorite:undefined,
    comicdetail:{
        id:string,
    }
}