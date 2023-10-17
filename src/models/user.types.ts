export interface IDocument {
    image: string,
    fullName: string,
    nickName: string,
    email?: string,
    id: string,
    birthday?:string,
    gender?:string,
}

export interface Decorate {
    id: string,
    description: string,
    howToGet: string,
    isLock?: boolean,
    needPoint?: number,
    tag: string,
    title: string,
    image: string
}

export interface IAuthor{
    id: string,
    name: string,
    description: string,
    numOfFollow: number,
    numOfComic: number,
    image: string,
    updatedComicAt: string,
    listComic: [],
    skip: number,
    limit: number
}
export interface IAuthorFollowing{
    skip:number,
    limit:number,
    data:[],
}
export interface IComicFollowing{
    skip:number,
    limit:number,
    data:[],
}