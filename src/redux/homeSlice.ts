import { sendRequest } from '@api'
import { IComic } from '@models'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { helper } from '@utils'

export const getSliderComics = createAsyncThunk('homeSlice/getSliderComics', async () => {
    let path = "api/user/getSliderComics"
    try {
        const res = await sendRequest(path);
        if (res.err !== 200) {
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
})
export const getNewestComics = createAsyncThunk('homeSlice/getNewestComics', async () => {
    let path = "api/user/getNewestComics"
    try {
        const res = await sendRequest(path);
        if (res.err !== 200) {
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
})
export const getProposeComics = createAsyncThunk('homeSlice/getProposeComics', async () => {
    let path = "api/user/getProposeComics"
    try {
        const res = await sendRequest(path);
        if (res.err !== 200) {
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
})
export const getDoneComics = createAsyncThunk('homeSlice/getDoneComics', async () => {
    let path = "api/user/getDoneComics"
    try {
        const res = await sendRequest(path);
        if (res.err !== 200) {
            helper.showErrorMsg(res.message)
            return false;
        }
        return res.data
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
})

export const getHotComic = createAsyncThunk('homeSlice/getHotComic', async () => {
    let path = "api/user/getHotComic"
    try {
        const res = await sendRequest(path);
        if (res.err !== 200) {
            helper.showErrorMsg(res.message)
            return false;
        }
        console.log(res.data)
        return res.data
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
})

type StateType = {
    sliderComic: IComic[],
    newestComic: IComic[],
    hotComic: IComic[],
    proposeComics: IComic[],
    doneComics: IComic[],
    selectComicId: string
}

const initialState: StateType = {
    sliderComic: [],//
    newestComic: [],
    hotComic: [],
    proposeComics: [],
    doneComics: [],
    selectComicId: "",
}

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        setSelectComicId: (state, action) => {
            state.selectComicId = action.payload;
        }
    },
    extraReducers: builder => builder.addCase(getSliderComics.fulfilled, (state, action) => {
        if(Array.isArray(action.payload))
            state.sliderComic = action.payload;
    }).addCase(getNewestComics.fulfilled, (state, action) => {
        if(Array.isArray(action.payload))
            state.newestComic = action.payload;
    }).addCase(getProposeComics.fulfilled, (state, action) => {
        if(Array.isArray(action.payload))
            state.proposeComics = action.payload;
    }).addCase(getDoneComics.fulfilled, (state, action) => {
        if(Array.isArray(action.payload))
            state.doneComics = action.payload;
    }).addCase(getHotComic.fulfilled,(state, action) => {
        if(Array.isArray(action.payload))
            state.hotComic = action.payload
    })
})
export const { setSelectComicId } = homeSlice.actions
export default homeSlice.reducer