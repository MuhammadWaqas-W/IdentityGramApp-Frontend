import React from 'react';
import { IndentityLogo } from '@icons';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { SelfieVerificationCamera } from '@molecules';
import { VerificationLoader } from '@molecules';

export const SelfieVerificationOrg = () => {
  const [reqStatus, setRequestStatus] = React.useState(false);
  const requestStatusHandler = (status: any) => {
    status === 'success' ? setRequestStatus(true) : setRequestStatus(false);
  };
  if (reqStatus) return <VerificationLoader />;
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        pt: 3,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Image src={IndentityLogo} alt="" priority={false} />
      </Box>

      <Typography
        sx={{
          fontSize: '24px',
          textAlign: 'center',
          fontWeight: 500,
          pt: 3,
          color: 'primary.dark',
        }}
      >
        Take a Selfie
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          pt: 3,
          color: 'primary.light',
        }}
      >
        Make sure that your face is in the frame and clearly visible
      </Typography>
      <SelfieVerificationCamera sendRequestSatus={requestStatusHandler} />
    </Box>
  );
};
