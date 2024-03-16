import React from 'react';
import { awsBaseUrl } from '@config';
import Image from 'next/image';
import { userAvatar } from '@icons';
import { Typography, Box, Grid } from '@mui/material';

export const NotificationAtom = ({ item }: any) => {
  let profileImg = item?.profile && awsBaseUrl + item?.profile;
  
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mt: 2,
          p: 1,
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'secondary.100',
          },
        }}
      >
        <Image
          src={userAvatar}
          alt=""
          height={44}
          width={44}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            pl: 3,
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography variant="h4">{item?.name}</Typography>
            <Typography
              variant="caption"
              sx={{ color: 'primary.light', alignSelf: 'flex-end' }}
            >
              {item?.timeElapsed}
            </Typography>
          </Grid>
          <Typography variant="caption">{item?.message}</Typography>
        </Box>
      </Box>
    </>
  );
};
