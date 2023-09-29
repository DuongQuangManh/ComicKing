import { sendRequest } from '@api';
import { IChapterDetails } from '@models'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { helper } from '@utils';
export const getChapterDetail = createAsyncThunk("chapterSlice/getChapterDetail",async (body:any)=>{
    let path = "api/user/detailChapter";
    try{
        const res = await sendRequest(path,body);
        if(res.err !== 200){
            helper.showErrorMsg(res.message)
            return false;
        }else{
            return res.data
        }
    }catch(error:any){
        console.log(error.message);
        return false;
    }
})
const initialState = {
    data:{} as IChapterDetails,
    loading:false,
}
const chapterSlice = createSlice({
    name:"chapterSlice",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getChapterDetail.pending,state=>{
            state.loading = true;
        }).addCase(getChapterDetail.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        }).addCase(getChapterDetail.rejected,state=>{
            state.loading = false;
        })
    }
})
export default chapterSlice.reducer