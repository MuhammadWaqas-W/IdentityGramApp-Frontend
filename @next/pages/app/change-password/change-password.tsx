import React from 'react';
import { ChangePasswordOrganism } from '@organisms';
import { DashboardLayout } from '@layouts';
import { Box } from '@mui/material';

export const AppChangePassword = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <ChangePasswordOrganism />
    </Box>
  );
};

AppChangePassword.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
