import React, { useRef } from 'react';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import { profilePic } from '@images';
import { useAppDispatch, useAppSelector } from '@hooks';
import { updateProfilePic } from '@store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { REQUEST_STATUS } from '@constants';
import { SmallLoader } from '@molecules';
import { awsBaseUrl } from '@config';

export const ProfileImageMolecule = ({ drawer }: any) => {
  const fileRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const {
    profileData,
    updateProfilePicRequestStatus,
    getProfileDataRequestStatus,
    profilePicture,
  } = useAppSelector((state: { profile: any }) => state.profile);
  const {
    email,
    firstName,
    lastName,
    defaultRole,
    profileImage,
    title,
    color,
  } = profileData;

  let uploadingProfileData =
    updateProfilePicRequestStatus === REQUEST_STATUS?.LOADING;
  let gettingProfileData =
    getProfileDataRequestStatus === REQUEST_STATUS?.LOADING;

  let profileImg =
    (profileImage || profilePicture) &&
    awsBaseUrl + (profilePicture || profileImage);

  const handleImageUpload = async (event: any) => {
    try {
      let response = null;
      const payload = { profileImage: event?.target.files[0] };
      response = await dispatch(updateProfilePic(payload));
      const { data, status } = unwrapResult(response);
      if (status === 200 || status === 201) {
        enqueueSnackbar(data?.message, {
          variant: 'success',
        });
      }
    } catch (error: any) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: drawer ? 'center' : 'flex-start',
        alignItems: 'center',
      }}
    >
      <Grid
        item
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: drawer ? 'column' : 'row',
        }}
      >
        {/* <Box
          sx={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            zIndex: 0,
            backgroundColor: 'rgba(31, 28, 29, 0.18)',
          }}
        ></Box> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 110,
            height: 110,
            borderRadius: drawer && '50%',
            border: drawer && '1px solid rgba(31, 28, 29, 0.18)',
          }}
        >
          {uploadingProfileData || gettingProfileData ? (
            <SmallLoader
              isLoader={uploadingProfileData || gettingProfileData}
            />
          ) : (
            <Image
              src={profileImg || profilePic}
              onClick={() => fileRef.current.click()}
              width={100}
              height={100}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              alt="profile-image"
            />
          )}
        </Box>
        <input
          accept="image/*"
          hidden
          type="file"
          ref={fileRef}
          onChange={handleImageUpload}
          name="profileImage"
          style={
            {
              // zIndex: 1111,
            }
          }
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: drawer ? 'center' : 'flex-start',
            flexDirection: 'column',
            p: 2,
          }}
        >
          {gettingProfileData ? (
            <SmallLoader isLoader={gettingProfileData} />
          ) : (
            <>
              <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                {`${firstName} ${lastName}`}
              </Typography>
              {(role === 'SUPER_ADMIN' ||
                (drawer && role === 'SIMPLE_USER') ||
                drawer) && (
                <Typography
                  variant="h4"
                  sx={{
                    color: 'primary.light',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: { lg: '290px', md: '240px', xs: '200px' },
                    overflow: 'hidden',
                    textAlign: drawer ? 'center' : 'start',
                  }}
                >
                  {email}
                </Typography>
              )}
              {role === 'COMPANY_ADMIN' && (
                <Box
                  sx={{
                    color: 'primary.light',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Typography
                    variant={`${drawer ? 'body1' : 'h5'}`}
                    sx={{ color: { color }, whiteSpace: 'nowrap' }}
                  >
                    {title}
                  </Typography>
                  {!drawer && (
                    <Typography
                      variant={`${drawer ? 'body1' : 'h5'}`}
                      sx={{ ml: { md: 1, xs: 0 } }}
                    >
                      | {role}
                    </Typography>
                  )}
                </Box>
              )}
              {role === 'SIMPLE_USER' && !drawer && (
                <Box sx={{ color: 'primary.light' }}>
                  <Typography variant="body1" sx={{ color: 'primary.main' }}>
                    {role}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
