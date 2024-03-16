import React, { useState } from 'react';
import { IndentityLogo } from '@icons';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DocumentVerificationCamera } from '@molecules';
import { VerificationLoader } from '@molecules';

export const VerificationProccessCameraAccess = () => {
  const [proofAddress, setProofAddress] = useState<boolean>(false);
  const { query } = useRouter();
  if (proofAddress) return <VerificationLoader />;
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
        Take a photo of your document
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          pt: 3,
          color: 'primary.light',
          '& span': {
            fontWeight: 500,
          },
        }}
      >
        Accepted Document Type:
        <span>
          {query?.keyword === 'Passport'
            ? ' passport'
            : query?.keyword === 'License'
            ? ' Driving License'
            : query?.keyword === 'Address Permit'
            ? ' Accepted Document Type: Residence Permit'
            : ' Utility Bills, Bank Statements, Rental Agreement, Letter of Employment'}
        </span>
      </Typography>
      <DocumentVerificationCamera
        isProofAddress={(val: boolean) => setProofAddress(val)}
      />
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          pt: 3,
          color: 'primary.dark',
        }}
      >
        Experiencing problems?
      </Typography>
    </Box>
  );
};
