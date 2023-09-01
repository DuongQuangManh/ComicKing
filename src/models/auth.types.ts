export interface ILoginWithGoogleBody {
    idToken: string,
}

export interface ILoginBody {
    email: string,
    password: string
}

export interface IRegisterBody extends ILoginBody {
    confirmPassword: string,
    fullName: string
}

export interface IVerifyOtpBody {
    code: string,
    email: string
}
