import { createSlice } from '@reduxjs/toolkit';
import { verificationInitialState } from './verification.types';

const verificationInitialState: verificationInitialState = {
  verifcationProccessResponseData: {},
};

export const VerificationSlice = createSlice({
  name: 'verificationSlice',
  initialState: verificationInitialState,
  reducers: {
    getVerificationData: (state, action) => {
      state.verifcationProccessResponseData = action.payload;
    },
  },
});

export const verificationAction = VerificationSlice.actions;
export const VerificationReducer = VerificationSlice.reducer;
