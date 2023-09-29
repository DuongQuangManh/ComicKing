import { sendRequest } from '@api'
import { IComicDetails } from '@models'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { helper } from '@utils'

export const detailComic = createAsyncThunk ("comicSlice/detailComic",async (body:any)=>{
    let path = "api/user/detailComic"
    try{
        const res =await sendRequest(path,body);
        if(res.err!==200){
            helper.showErrorMsg(res.message);
        }else{
            return res.data;
        }
    }catch(error:any){
        console.log(error.message)
        return false;
    }
})

const initialState = {
    data:{
        updatedAt:"",
        id: "",
        name: "",
        description: "",
        numOfChapter: 0,
        numOfFavorite: 0,
        image: "",
        numOfComment: 0,
        numOfView: 0,
        isHot: false,
        star: 0,
        numOfRate: 0,
        publishedAt: "",
        numOfLike: 0,
        updatedChapterAt: 0,
        author: {},
        specialList: null,
        categories:[],
        chapters: []
    } as IComicDetails,
    loading:false,
}


const comicSlice = createSlice({
    name:"comicSlice",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(detailComic.pending,state=>{
            state.loading = true;
        }).addCase(detailComic.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload
        }).addCase(detailComic.rejected,state=>{
            state.loading = false;
        })
    }
})

export default comicSlice.reducer