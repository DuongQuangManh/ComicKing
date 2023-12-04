import {sendRequest} from '@api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {helper} from '@utils';

export const getListNotification = createAsyncThunk(
  'notificationSlice/getListNotification',
  async (body: {userId: string}) => {
    let path = 'api/user/getListNotification';
    helper.showLoading();
    const res = await sendRequest(path, body);
    helper.hideLoading();
    if (res.err === 200) {
      return res.data;
    } else {
      return false;
    }
  },
);

export const getCountNewNotification = createAsyncThunk(
  'notificationSlice/getCountNewNotification',
  async (body: {userId: string}) => {
    let path = 'api/user/getCountNewNotification';
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      return res.data;
    } else {
      return false;
    }
  },
);

export const resetCountNewNotification = createAsyncThunk(
  'notificationSlice/resetCountNewNotification',
  async (body: {userId: string}) => {
    let path = 'api/user/resetCountNewNotification';
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      return res.data;
    } else {
      return false;
    }
  },
);

export const getDetailNotification = createAsyncThunk(
  'notificationSlice/getDetailNotification',
  async (body: {notificationId: string}) => {
    helper.showLoading();
    let path = 'api/user/getDetailNotification';
    const res = await sendRequest(path, body);
    helper.hideLoading();
    if (res.err === 200) {
      return res.data;
    } else {
      return false;
    }
  },
);

type StateType = {
  listNotification: any[];
  countNew: number;
};

const initialState: StateType = {
  listNotification: [],
  countNew: 0,
};

const notificationSlice = createSlice({
  name: 'levelSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListNotification.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload)) {
          state.listNotification = action.payload;
        }
      })
      .addCase(getCountNewNotification.fulfilled, (state, action) => {
        if (action.payload && typeof action.payload == 'number') {
          state.countNew = action.payload;
        }
      })
      .addCase(resetCountNewNotification.fulfilled, (state, action) => {
        if (typeof action.payload == 'number') {
          state.countNew = action.payload;
        }
      })
      .addCase(getDetailNotification.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default notificationSlice.reducer;
