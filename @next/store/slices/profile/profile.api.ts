import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetRequest, apiPatchRequest, apiPutRequest } from '@helpers';
import { endpoints } from '@config';

export const updateProfileData = createAsyncThunk(
  '/putProfileData',
  async (payload: any) => {
    return await apiPatchRequest(endpoints?.updateProfileData, payload).then(
      (res) => Promise.resolve(res),
    );
  },
);

export const getProfileData = createAsyncThunk('/getProfileData', async () => {
  return await apiGetRequest(endpoints?.getProfileData).then((res) =>
    Promise.resolve(res),
  );
});

export const getProfilePic = createAsyncThunk('/getProfilePic', async () => {
  return await apiGetRequest(endpoints?.getProfilePic).then((res) =>
    Promise.resolve(res),
  );
});

export const updateProfilePic = createAsyncThunk(
  '/putProfilePic',
  async (payload: any) => {
    const res = await apiPutRequest(
      endpoints?.putProfilePic,
      payload,
      null,
      'multipart/form-data',
    );
    return Promise.resolve(res);
  },
);
