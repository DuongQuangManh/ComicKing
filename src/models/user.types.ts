export interface IDocument {
    image: string,
    fullName: string,
    nickName: string,
    email?: string,
    id: string,
    birthday?:string,
    gender?:string,
}

export interface AvatarFrame {
    id: string,
    description: string,
    howToGet: string,
    isLock?: boolean,
    needPoint?: number,
    tag: string,
    title: string,
    image: string
}