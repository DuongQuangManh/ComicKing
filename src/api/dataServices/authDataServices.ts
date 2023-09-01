import { ILoginBody, ILoginWithGoogleBody, IRegisterBody, IVerifyOtpBody } from "@models"
import sendRequest from "../sendRequest"

export default  {
    login : (body: ILoginBody) => {

    },
    loginVerifyOtp: (body: IVerifyOtpBody) => {
        
    },
    register: (body: IRegisterBody) => {

    },
    registerVerifyOtp: (body: IVerifyOtpBody) => {

    },
    loginWithGoogle: (body: ILoginWithGoogleBody) => {
        let path = 'api/user/loginWithGoogle'
        return sendRequest(path, body)
    }
}