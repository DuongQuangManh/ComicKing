import {sendRequest} from '@api';
import {IComic, IReadingHistory} from '@models';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {helper} from '@utils';

export const getSliderComics = createAsyncThunk(
  'homeSlice/getSliderComics',
  async () => {
    let path = 'api/user/getSliderComics';
    try {
      const res = await sendRequest(path);
      if (res.err !== 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
);
export const getNewestComics = createAsyncThunk(
  'homeSlice/getNewestComics',
  async () => {
    let path = 'api/user/getNewestComics';
    try {
      const res = await sendRequest(path);
      if (res.err !== 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
);
export const getProposeComics = createAsyncThunk(
  'homeSlice/getProposeComics',
  async () => {
    let path = 'api/user/getProposeComics';
    try {
      const res = await sendRequest(path);
      if (res.err !== 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
);
export const getDoneComics = createAsyncThunk(
  'homeSlice/getDoneComics',
  async () => {
    let path = 'api/user/getDoneComics';
    try {
      const res = await sendRequest(path);
      if (res.err !== 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
);

export const getHotComic = createAsyncThunk(
  'homeSlice/getHotComic',
  async () => {
    let path = 'api/user/getHotComic';
    try {
      const res = await sendRequest(path);
      if (res.err !== 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
);

export const getNewestComicUpdatedChapter = createAsyncThunk(
  'homeSlice/getNewestComicUpdatedChapter',
  async () => {
    let path = 'api/user/getNewestComicUpdatedChapter';
    try {
      const res = await sendRequest(path);
      if (res.err !== 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
);

type StateType = {
  sliderComic: IComic[];
  newestComic: IComic[];
  hotComic: IComic[];
  proposeComics: IComic[];
  doneComics: IComic[];
  newestComicUpdatedChapter: IComic[];
  readingHistory: IReadingHistory[];
  selectComicId: string;
};

const initialState: StateType = {
  sliderComic: [], //
  newestComic: [],
  hotComic: [],
  proposeComics: [],
  doneComics: [],
  readingHistory: [],
  selectComicId: '',
  newestComicUpdatedChapter: [],
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    setSelectComicId: (state, action) => {
      state.selectComicId = action.payload;
    },
    setReadingHistory: (state, action) => {
      if (Array.isArray(action.payload)) {
        if (action.payload.length <= 8) {
          state.readingHistory = action.payload;
        } else {
          state.readingHistory = action.payload.slice(0, 8);
        }
      }
    },
    unshiftHistoryItem: (state, action) => {
      if (action.payload) {
        let cloneArr: IReadingHistory[] = JSON.parse(
          JSON.stringify(state.readingHistory),
        );
        for (let i = 0; i < cloneArr.length; i++) {
          if (cloneArr[i].id == action.payload.id) {
            cloneArr.splice(i, 1);
            cloneArr.unshift(action.payload);
            state.readingHistory = cloneArr;
            return;
          }
        }
        if (state.readingHistory?.length > 8) {
          state.readingHistory.pop();
        }
        state.readingHistory.unshift(action.payload);
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getSliderComics.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.sliderComic = action.payload;
      })
      .addCase(getNewestComics.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.newestComic = action.payload;
      })
      .addCase(getProposeComics.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.proposeComics = action.payload;
      })
      .addCase(getDoneComics.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.doneComics = action.payload;
      })
      .addCase(getHotComic.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.hotComic = action.payload;
      })
      .addCase(getNewestComicUpdatedChapter.fulfilled, (state, action) => {
        if (Array.isArray(action.payload))
          state.newestComicUpdatedChapter = action.payload;
      }),
});
export const {setSelectComicId, setReadingHistory, unshiftHistoryItem} =
  homeSlice.actions;
export default homeSlice.reducer;
