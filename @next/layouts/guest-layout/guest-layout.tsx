import React from 'react';
import { Box } from '@mui/material';
import { GuestGuard } from '@utils';

export const GuestLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <GuestGuard>
    <Box
      sx={{
        margin: 'auto',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  </GuestGuard>
);
