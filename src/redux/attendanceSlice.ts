import { sendRequest } from '@api';
import { IAttendance } from '@models'
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'


export const getAttendance = createAsyncThunk("attenDanceSlice/getAttendance",async (id:string)=>{
    let path = "api/user/findAttendance";
    try{
        const res = await sendRequest(path,{userId:id});
    if(res.err === 200){
        return res.data
    }else{
        return false;
    }
    }catch(error){
        console.log(error)
    }
})
const initialState={
    data:[] as IAttendance[]
}

const attenDanceSlice = createSlice({
    name:"attenDanceSlice",
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getAttendance.fulfilled,(state,action)=>{
            state.data = action.payload
        })
    }
})

export default attenDanceSlice.reducer