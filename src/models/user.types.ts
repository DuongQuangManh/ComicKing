export interface IDocument {
    image: string,
    fullName: string,
    nickName: string,
    email?: string,
    id: string,
    birthday?:string,
    gender?:string,
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