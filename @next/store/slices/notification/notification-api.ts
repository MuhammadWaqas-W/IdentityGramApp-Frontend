import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getNotification = createAsyncThunk(
  '/getNotificationData',
  async () => {
    return await apiGetRequest(endpoints?.latestNotification).then((res) =>
      Promise.resolve(res),
    );
  },
);
