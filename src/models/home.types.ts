export interface IComic{
    id:string,
    name: string,

    description:string,

    categories: any,

    author: any,

    numOfChapter: number,

    status: string,

    numOfFavorite:number,

    image: string,

    numOfComment: number,

    numOfView: number,

    isHot: boolean,

    uId: string,

    chapters: any,

    specialList:any,

    star: number,

    numOfRate: number,

    publishedAt: number
}

export interface IComicDetails{
    updatedAt:string,
    id: string,
    name: string,
    description: string,
    numOfChapter: number,
    numOfFavorite: number,
    image: string,
    numOfComment: number,
    numOfView: number,
    isHot: boolean,
    star: number,
    numOfRate: number,
    publishedAt: string,
    numOfLike: number,
    updatedChapterAt: number,
    author: any,
    specialList: null,
    categories:any,
    chapters: any,
    readingChapter:number,
}

export interface IChapterDetails{
    id:string,
    images:[] ,
    comic:string,
    chapterIndex:string
}