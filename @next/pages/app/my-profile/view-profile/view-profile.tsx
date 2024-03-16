import { REQUEST_STATUS } from '@constants';
import { useAppSelector } from '@hooks';
import {
  viewUserProfile,
  emailSvgIcon,
  number,
  viewProduct,
  viewDate,
} from '@icons';
import { SmallLoader } from '@molecules';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

const ViewProfile = () => {
  const { profileData, getProfileDataRequestStatus } = useAppSelector(
    (state: { profile: any }) => state.profile,
  );
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const {
    email,
    firstName,
    lastName,
    defaultRole,
    contactNumber,
    createdAt,
    title,
  } = profileData;
  let gettingProfileData =
    getProfileDataRequestStatus === REQUEST_STATUS?.LOADING;
  return (
    <>
      {gettingProfileData ? (
        <SmallLoader isLoader={gettingProfileData} />
      ) : (
        <Grid container mt={3} spacing={3}>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Image src={viewUserProfile} alt="First Name" />
            <Box sx={{ marginLeft: '6px' }}>
              <Typography variant="h6" color={'primary.light'}>
                First Name
              </Typography>
              <Typography variant="h5" color={'primary.main'}>
                {firstName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Image src={viewUserProfile} alt="Last Name" />
            <Box sx={{ marginLeft: '6px' }}>
              <Typography variant="h6" color={'primary.light'}>
                Last Name
              </Typography>
              <Typography variant="h5" color={'primary.main'}>
                {lastName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Image src={emailSvgIcon} alt="Email" />
            <Box sx={{ marginLeft: '6px' }}>
              <Typography variant="h6" color={'primary.light'}>
                Email Address
              </Typography>
              <Typography variant="h5" color={'primary.main'}>
                {email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Image src={number} alt="Contact number" />
            <Box sx={{ marginLeft: '6px' }}>
              <Typography variant="h6" color={'primary.light'}>
                Contact Number
              </Typography>
              <Typography variant="h5" color={'primary.main'}>
                {contactNumber}
              </Typography>
            </Box>
          </Grid>
          {role === 'COMPANY_ADMIN' && (
            <>
              <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Image src={viewProduct} alt="Contact number" />
                <Box sx={{ marginLeft: '6px' }}>
                  <Typography variant="h6" color={'primary.light'}>
                    Product Title
                  </Typography>
                  <Typography variant="h5" color={'primary.main'}>
                    {title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Image src={viewDate} alt="Contact number" />
                <Box sx={{ marginLeft: '6px' }}>
                  <Typography variant="h6" color={'primary.light'}>
                    Created Date
                  </Typography>
                  <Typography variant="h5" color={'primary.main'}>
                    {moment(createdAt).format('DD/MM/yyyy')}
                  </Typography>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default ViewProfile;
