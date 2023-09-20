import { sendRequest } from '@api'
import { IComic } from '@models'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { helper } from '@utils'

export const getSliderComics = createAsyncThunk('homeSlice/getSliderComics',async()=>{
    let path = "api/user/getSliderComics"
    try{
        const res = await sendRequest(path);
        if(res.err!==200){
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    }catch(error:any){
        console.log(error.message);
        return false;
    }
})
export const getNewestComics = createAsyncThunk('homeSlice/getNewestComics',async()=>{
    let path = "api/user/getNewestComics"
    try{
        const res = await sendRequest(path);
        if(res.err!==200){
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    }catch(error:any){
        console.log(error.message);
        return false;
    }
})
export const getProposeComics = createAsyncThunk('homeSlice/getProposeComics',async()=>{
    let path = "api/user/getProposeComics"
    try{
        const res = await sendRequest(path);
        if(res.err!==200){
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    }catch(error:any){
        console.log(error.message);
        return false;
    }
})
export const getDoneComics = createAsyncThunk('homeSlice/getDoneComics',async()=>{
    let path = "api/user/getDoneComics"
    try{
        const res = await sendRequest(path);
        if(res.err!==200){
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    }catch(error:any){
        console.log(error.message);
        return false;
    }
})

const initialState = {
    sliderComic:[] as IComic[],//
    newestComic:[] as IComic[],
    proposeComics:[] as IComic[],
    doneComics:[] as IComic[]
}

const homeSlice = createSlice({
    name:'homeSlice',
    initialState,
    reducers:{},
    extraReducers:builder=>builder.addCase(getSliderComics.fulfilled,(state,action)=>{
        state.sliderComic = action.payload.listComic;
    }).addCase(getNewestComics.fulfilled,(state,action)=>{
        state.newestComic = action.payload.listComic;
    }).addCase(getProposeComics.fulfilled,(state,action)=>{
        state.proposeComics = action.payload.listComic;
    }).addCase(getDoneComics.fulfilled,(state,action)=>{
        state.doneComics = action.payload.listComic;
    })
})

export default homeSlice.reducer