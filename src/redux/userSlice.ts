import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface IUserState {
    document: IDocument
}

const initialState: IUserState = {
    document: {
        image: '',
        fullName: '',
        nickName: '',
        id: ''
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDocumentInfo: (state, action: PayloadAction<IDocument>) => {
            state.document = action.payload
        }
    },
})

export const { setDocumentInfo } = userSlice.actions
export default userSlice.reducer

