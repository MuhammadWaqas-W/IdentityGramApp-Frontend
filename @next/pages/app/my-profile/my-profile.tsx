import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ViewProfile from './view-profile/view-profile';
import EditProfile from './edit-profile/edit-profile';
import Image from 'next/image';
import { DashboardLayout } from '@layouts';
import { BreadcrumbsAtom } from '@atoms';
import { ProfileImageMolecule } from '@molecules';
import { edit } from '@icons';

export const MyProfilePage = () => {
  const [editProfile, setEditProfile] = useState(false);

  return (
    <>
      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              mt: 2,
            }}
          >
            <ProfileImageMolecule />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)', mt: 4 }}
        >
          <Typography variant="h2" sx={{ color: 'primary.dark' }} mt={2}>
            {editProfile ? (
              'Update Profile'
            ) : (
              <Box sx={{ display: 'flex', color: 'primary.dark' }}>
                Profile Information
                <Typography
                  onClick={() => setEditProfile(true)}
                  variant="h6"
                  sx={{
                    ml: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Image src={edit} alt="Edit" width={20} height={20} />
                  Edit
                </Typography>
              </Box>
            )}
          </Typography>
          {editProfile ? (
            <EditProfile setEditProfile={setEditProfile} />
          ) : (
            <ViewProfile />
          )}
        </Grid>
      </Grid>
    </>
  );
};

MyProfilePage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
