import { REQUEST_STATUS } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import { getNotification } from './notification-api';
import { notificationState } from './notification.types';

const notificationInitialState: notificationState = {
  latestNotification: [],
  getNotificationDataRequestStatus: REQUEST_STATUS?.IDEL,
};

export const NotificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: notificationInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotification.pending, (state, action) => {
      state.getNotificationDataRequestStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getNotification.fulfilled, (state, action: any) => {
      const { data } = action?.payload;
      state.latestNotification = data?.data?.data;
      state.getNotificationDataRequestStatus = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getNotification.rejected, (state, error) => {
      state.getNotificationDataRequestStatus = REQUEST_STATUS.FAILURE;
    });
  },
});

export const NotificationReducer = NotificationSlice.reducer;
