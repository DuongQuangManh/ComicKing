import {sendRequest} from '@api';
import {TCoinPackage, TVipTicket} from '@models';
import {navigate} from '@navigations';
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

export const createCoinPackageTransaction = createAsyncThunk(
  'payment/createCoinPackageTransaction',
  async body => {
    const path = '/api/user/createCoinPackageTransaction';
    try {
      helper.showLoading();
      const res = await sendRequest(path, body);
      helper.hideLoading();
      if (res.err == 200) {
      } else {
        helper.showErrorMsg(res.message);
      }
    } catch (error) {
      helper.hideLoading();
    }
  },
);

export const createVipTicketTransaction = createAsyncThunk(
  'payment/createVipTicketTransaction',
  async body => {
    const path = '/api/user/createVipTicketTransaction';
    try {
      helper.showLoading();
      const res = await sendRequest(path, body);
      helper.hideLoading();
      if (res.err == 200) {
      } else {
        helper.showErrorMsg(res.message);
      }
    } catch (error) {
      helper.hideLoading();
    }
  },
);

export const requestEndTransaction = createAsyncThunk(
  'payment/requestEndTransaction',
  async body => {
    const path = '/api/user/requestEndTransaction';
    try {
      helper.showLoading();
      const res = await sendRequest(path, body);
      helper.hideLoading();
      if (res.err == 200) {
      } else {
        helper.showErrorMsg(res.message);
      }
    } catch (error) {
      helper.hideLoading();
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
