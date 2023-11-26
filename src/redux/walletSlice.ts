import { sendRequest } from '@api';
import { TWallet } from '@models'
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

export const getUserWallet = createAsyncThunk("walletSlice/getUserWallet",async (id:string)=>{
    let path = "api/user/getWalletInfo";
    try{
        const res = await sendRequest(path,{userId:id});
        if(res.err ===200){
            return res.data;
        }
    }catch(err){
        console.log(err);
        return false
       
    }
})

const initialState = {
    data:{} as TWallet,
}

const walletSlice = createSlice({
    name:'walletSlice',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getUserWallet.fulfilled,(state,action)=>{
            state.data = action.payload
        })
    }
})

export default walletSlice.reducer