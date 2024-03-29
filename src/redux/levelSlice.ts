import {sendRequest} from '@api';
import {ILevel} from '@models';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getLevel = createAsyncThunk(
  'levelSlice/getLevel',
  async (body: any) => {
    let path = 'api/user/findLevel';
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      return res.data;
    } else {
      return false;
    }
  },
);
const initialState = {
  data: {} as ILevel,
};
const levelSlice = createSlice({
  name: 'levelSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLevel.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default levelSlice.reducer;
