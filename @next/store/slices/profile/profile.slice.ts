import { createSlice } from '@reduxjs/toolkit';
import { profileInitialStateTypes } from './profile.types';
import { PERMISSIONS, REQUEST_STATUS } from '@constants';
import {
  updateProfileData,
  getProfileData,
  getProfilePic,
  updateProfilePic,
} from './profile.api';
import { profilePic } from '@images';

export const profileInitialState: profileInitialStateTypes = {
  profileData: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    companyId: '',
    defaultRole: '',
    userPermissions: [],
    profileImage: profilePic,
    color: '',
  },
  profilePicture: '',
  getProfileDataRequestStatus: REQUEST_STATUS?.IDEL,
  getProfilePicRequestStatus: REQUEST_STATUS?.IDEL,
  updateProfilePicRequestStatus: REQUEST_STATUS?.IDEL,
};

const profile = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {},

  extraReducers: (builder) => {
    // START GET PROFILE DATA
    builder.addCase(getProfileData.pending, (state, action) => {
      state.getProfileDataRequestStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getProfileData.fulfilled, (state, action: any) => {
      const { data } = action?.payload;
      state.profileData = data?.data;
      state.profileData.userPermissions = PERMISSIONS;
      state.getProfileDataRequestStatus = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getProfileData.rejected, (state, error) => {
      state.getProfileDataRequestStatus = REQUEST_STATUS.FAILURE;
    });
    // END GET PROFILE DATA

    // START UPDATE PROFILE DATA
    builder.addCase(updateProfileData.pending, (state, action) => {
      state.getProfileDataRequestStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action: any) => {
      const { data } = action?.payload;
      state.profileData = data?.data;
      state.getProfileDataRequestStatus = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(updateProfileData.rejected, (state, error) => {
      state.getProfileDataRequestStatus = REQUEST_STATUS.FAILURE;
    });
    // END UPDATE PROFILE DATA

    // START GET PROFILE PIC
    builder.addCase(getProfilePic.pending, (state, action) => {
      state.getProfilePicRequestStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(getProfilePic.fulfilled, (state, action: any) => {
      const { data } = action?.payload;
      state.profilePicture = data?.data;
      state.getProfilePicRequestStatus = REQUEST_STATUS.SUCCESS;
    });
    builder.addCase(getProfilePic.rejected, (state, error) => {
      state.getProfilePicRequestStatus = REQUEST_STATUS.FAILURE;
    });
    // END GET PROFILE PIC

    // START PATCH PROFILE PIC
    builder.addCase(updateProfilePic.pending, (state, action) => {
      state.updateProfilePicRequestStatus = REQUEST_STATUS.LOADING;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action: any) => {
      const { data } = action?.payload;
      state.updateProfilePicRequestStatus = REQUEST_STATUS.SUCCESS;
      state.profilePicture = data?.data;
    });
    builder.addCase(updateProfilePic.rejected, (state, error) => {
      state.updateProfilePicRequestStatus = REQUEST_STATUS.FAILURE;
    });
    // END PATCH PROFILE PIC
  },
});

export const profileActions = profile.actions;
export const profileReducer = profile.reducer;
