import { sendRequest } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { helper } from '@utils';
import { AppDispatch } from './store';
import { goBack } from '@navigations';

import { IAuthor, Decorate,IAuthorFollowing, IComicFollowing, IDocument } from '@models';


interface IProfile {
    id: string,
}
export const getProfileAction = createAsyncThunk<any, IProfile>('userSlice/getProfileAction', async (body: IProfile) => {
    let path = "api/user/getProfile";
    try {
        const res = await sendRequest(path, body);
        if (res.err !== 200) {
            helper.showErrorMsg(res.message);
            return false;
        } else {
            return res.data;
        }
    } catch (error: any) {
        helper.showErrorMsg(error.message);
        return false;
    }
})

export const updateProfileAction = createAsyncThunk('userSlice/updateProfileAction', async (body: IDocument) => {
    let path = "api/user/updateProfile";
    try {

        helper.showLoading();
        const res = await sendRequest(path, body);
        if (res.err != 200) {
            helper.showErrorMsg(res.message);
            return false;
        } else {
            helper.hideLoading();
            helper.showSuccessMsg(res.message, () => goBack(2));
            return res.data;
        }
    } catch (error: any) {
        return false;
    }
})

export const getUserInfoAction = createAsyncThunk('userSlice/getUserInfo', async (body: { id: string }) => {
    let path = 'api/user/getUserInfo'
    try {
        const res = await sendRequest(path, body)
        if (res.err == 200) {
            return res.data
        }
    } catch (error: any) {
        return false
    }
})


export const getAuthorFollowing = createAsyncThunk("userSlice/getAuthorFollowing",async (body:any)=>{
    let path = "api/user/getAuthorFollowing"
    try{
        const res = await sendRequest(path,body);
        if(res.err === 200){
            return res
        }
    }catch(error:any){
        return false
    }
})

export const getComicFollowing = createAsyncThunk("userSlice/getComicFollowing",async (body:any)=>{
    let path = "api/user/getComicFollowing"
    try{
        const res = await sendRequest(path,body);
        if(res.err === 200){
            return res
        }
    }catch(error:any){
        return false
    }
})

interface IUserState {
    document: IDocument,
    loading:boolean;
    avatarFrame: Decorate | null,
    authorFollowing:IAuthorFollowing | null |any,
    comicFollowing:IComicFollowing | null |any
}
export const changeAvatarFrameAction = createAsyncThunk(
    'auth/changeAvatarFrame',
    async (body: { userId: string, avatarFrameId: string }) => {
        let path = 'api/user/changeAvatarFrame'
        try {
            helper.showLoading()
            const res = await sendRequest(path, body)
            helper.hideLoading()
            if (res.err == 200) {
                return res.data
            } else {
                helper.showErrorMsg(res.message)
                return false
            }
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const changeAvatarTitleAction = createAsyncThunk(
    'auth/changeAvatarTitle',
    async (body: { userId: string, avatarTitleId: string }) => {
        let path = 'api/user/changeAvatarTitle'
        try {
            helper.showLoading()
            const res = await sendRequest(path, body)
            helper.hideLoading()
            if (res.err == 200) {
                return res.data
            } else {
                helper.showErrorMsg(res.message)
                return false
            }
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

interface IUserState {
    document: IDocument,
    loading: boolean;
    avatarFrame: Decorate | null,
    avatarTitle: Decorate | null,
    vipPoint: number,
    levelPoint: number

}

const initialState: IUserState = {
    document: {
        id: '',
        image: '',
        fullName: '',
        nickName: '',
        birthday: "",
        gender: '',
    },
    avatarFrame: null,
    authorFollowing:null,
    comicFollowing:null,
    loading:false,
    avatarTitle: null,
    vipPoint: 0,
    levelPoint: 0,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDocumentInfo: (state, action: PayloadAction<IDocument>) => {
            state.document = action.payload
        },
        addAuthorToListFollowing:(state,action)=>{
            state.authorFollowing?.data.push(action.payload)
        },
        deleteAuthorToListFollowing:(state,action)=>{
            const index = state.authorFollowing.data.findIndex((item:any) => item.id === action.payload);
            if (index !== -1) {
                state.authorFollowing.data.splice(index, 1);
            }
        },
        addComicToListFollowing:(state,action)=>{
            state.comicFollowing?.data.push(action.payload)
        },
        deleteComicToListFollowing:(state,action)=>{
            const index = state.comicFollowing.data.findIndex((item:any) => item.id === action.payload);
            if (index !== -1) {
                state.comicFollowing.data.splice(index, 1);
            }
        },

    },
    extraReducers: builder => {
        builder.addCase(getProfileAction.pending, state => {
            state.loading = true;
        }).addCase(getProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.document.birthday = action.payload.birthday;
            state.document.gender = action.payload.gender;
        }).addCase(getProfileAction.rejected, (state, action) => {
            state.loading = false;
        }).addCase(updateProfileAction.fulfilled, (state, action) => {
            state.document.nickName = action.payload.nickName;
            state.document.image = action.payload.image;
            state.document.gender = action.payload.gender;
            state.document.birthday = action.payload.birthday;
            state.document.fullName = action.payload.fullName;
        }).addCase(getAuthorFollowing.fulfilled, (state, action) => {
            state.authorFollowing = action.payload
        }).addCase(getComicFollowing.fulfilled, (state, action) => {
            state.comicFollowing = action.payload
        }).addCase(getUserInfoAction.fulfilled, (state, action) => {
            if (action.payload) {
                const { avatarFrame, vipPoint, levelPoint, avatarTitle } = action.payload
                state.avatarFrame = avatarFrame
                state.avatarTitle = avatarTitle
                state.vipPoint = vipPoint
                state.levelPoint = levelPoint
            }
        }).addCase(changeAvatarFrameAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.avatarFrame = action.payload
            }
        }).addCase(changeAvatarTitleAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.avatarTitle = action.payload
            }
        })
    }
})

export const { setDocumentInfo ,addAuthorToListFollowing,deleteAuthorToListFollowing,addComicToListFollowing,deleteComicToListFollowing} = userSlice.actions
export default userSlice.reducer

