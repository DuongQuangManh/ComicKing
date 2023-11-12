import {sendRequest} from '@api';
import {TCoinPackage, TVipTicket} from '@models';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {helper} from '@utils';

type InitialStateType = {
  isLoadingDetail: boolean;
  listVipTicket: TVipTicket[];
  listCoinPackage: TCoinPackage[];
};

const initialState: InitialStateType = {
  isLoadingDetail: false,
  listVipTicket: [],
  listCoinPackage: [],
};

export const getVipTicket = createAsyncThunk(
  'payment/getVipTicket',
  async (_, {rejectWithValue}) => {
    let path = 'api/user/findVipTicket';
    try {
      const res = await sendRequest(path);
      if (res.err == 200) {
        return res.data;
      }

      helper.showErrorMsg(res.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getCoinPackage = createAsyncThunk(
  'payment/getCoinPackage',
  async (_, {rejectWithValue}) => {
    let path = 'api/user/findCoinPackage';
    try {
      const res = await sendRequest(path);
      if (res.err == 200) {
        return res.data;
      }

      helper.showErrorMsg(res.message);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const paymentSlice = createSlice({
  name: 'cate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getVipTicket.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.listVipTicket = action.payload;
        }
      })
      .addCase(getCoinPackage.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.listCoinPackage = action.payload;
        }
      });
  },
});

export default paymentSlice.reducer;
