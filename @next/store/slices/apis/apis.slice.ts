import { REQUEST_STATUS } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import { getApisData } from './apis-api';
import { apisState } from './apis.types';

const apisInitialState: apisState = {
  apisData: [],
  status: REQUEST_STATUS?.IDEL,
};

export const ApisSlice = createSlice({
  name: 'apisSlice',
  initialState: apisInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApisData.pending, (state, action) => {
      state.status = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getApisData.fulfilled, (state, action: any) => {
      const { data } = action?.payload;
      state.apisData = data?.data;
      state.status = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getApisData.rejected, (state, error) => {
      state.status = REQUEST_STATUS.FAILURE;
    });
  },
});

export const ApisReducer = ApisSlice.reducer;
