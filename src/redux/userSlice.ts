import { sendRequest } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { helper } from '@utils';
import { AppDispatch } from './store';
import { goBack } from '@navigations';
import { AvatarFrame, IDocument } from '@models';


interface IProfile{
    id:string,
}
export const getProfileAction = createAsyncThunk<any,IProfile>('userSlice/getProfileAction',async(body:IProfile) => {
    let path = "api/user/getProfile";
    try{
        const res =await sendRequest(path,body);
        if(res.err !== 200){
            helper.showErrorMsg(res.message);
            return false;
        }else{
            return res.data;
        }
    }catch(error:any){
        helper.showErrorMsg(error.message);
        return false;
    }
})

export const updateProfileAction = createAsyncThunk('userSlice/updateProfileAction',async(body:IDocument)=>{
    let path = "api/user/updateProfile";
    try{
        
        helper.showLoading();
        const res =await sendRequest(path,body);
        if(res.err != 200){
            helper.showErrorMsg(res.message);
            return false;
        }else{
            helper.hideLoading();
            helper.showSuccessMsg(res.message,()=>goBack(2));
            return res.data;
        }
    }catch(error:any){
        return false;
    }
})

export const getUserInfo = createAsyncThunk('userSlice/getUserInfo', async(body: {id: string})=>{
    let path = 'api/user/getUserInfo'
    try{
        const res = await sendRequest(path, body)
        if(res.err == 200){
            return res.data
        }
    }catch(error: any){
        return false 
    }
})


interface IUserState {
    document: IDocument,
    loading:boolean;
    avatarFrame: AvatarFrame | null
}

const initialState: IUserState = {
    document: {
        id: '',
        image: '',
        fullName: '',
        nickName: '',
        birthday:"",
        gender:'',
    },
    avatarFrame: null,
    loading:false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDocumentInfo: (state, action: PayloadAction<IDocument>) => {
            state.document = action.payload
        }
    },
    extraReducers:builder=>{
        builder.addCase(getProfileAction.pending,state=>{
            state.loading = true;
        }).addCase(getProfileAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.document.birthday = action.payload.birthday;
            state.document.gender = action.payload.gender;
        }).addCase(getProfileAction.rejected,(state,action)=>{
            state.loading =false;
        }).addCase(updateProfileAction.fulfilled,(state,action)=>{
            state.document.nickName = action.payload.nickName;
            state.document.image = action.payload.image;
            state.document.gender = action.payload.gender;
            state.document.birthday = action.payload.birthday;
            state.document.fullName = action.payload.fullName;
        }).addCase(getUserInfo.fulfilled, (state, action) => {
            state.avatarFrame = action.payload?.avatarFrame
        })
    }
})

export const { setDocumentInfo } = userSlice.actions
export default userSlice.reducer

