import { sendRequest } from '@api';
import { CateModel } from '@models'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCate = createAsyncThunk('cate/get', async (_, { rejectWithValue }) => {
    let path = "api/user/findCategory";
    try {
        const res = await sendRequest(path);
        if (res.err != 200) {
            return rejectWithValue(res.message);
        }
        
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

const initialState = {
    data: [] as CateModel[],
    loading: false,
    select: "all" as string,
    selectBXh:1 as number,
}

const cateSlice = createSlice({
    name: "cate",
    initialState,
    reducers: {
        setSelect: (state, action) => {
            state.select = action.payload
        },
        setSelectBXH: (state, action) => {
            state.selectBXh = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getCate.pending, state => {
            state.loading = true;
        }).addCase(getCate.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(getCate.rejected, (state, action) => {
            state.loading = false;
            console.log('[Error at categorySlice]', action.payload)
        })
    }
})

export const { setSelect,setSelectBXH } = cateSlice.actions
export default cateSlice.reducer