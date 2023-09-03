
export interface BaseResponse {
    err: number
    message: string
}

export type ApiResult = { err: number, message: string, data: any }