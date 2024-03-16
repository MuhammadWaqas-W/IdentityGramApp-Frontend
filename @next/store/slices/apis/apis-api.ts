import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getApisData = createAsyncThunk(
  '/api-logs/latest-apis-and-count',
  async () => {
    return await apiGetRequest(endpoints?.apisCountAndData).then((res) =>
      Promise.resolve(res),
    );
  },
);
