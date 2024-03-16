import { Box, Typography } from '@mui/material';
import React from 'react';
import { DashboardCardTypes } from './dashboard-card.types';

export const DashboardCard = ({
  heading,
  children,
  headingSibling,
}: DashboardCardTypes) => {
  return (
    <Box
      sx={{
        backgroundColor: 'common.white',
        boxShadow:
          '-8px -8px 32px rgba(191, 172, 224, 0.05), 8px 8px 32px rgba(191, 172, 224, 0.05)',
        borderRadius: '12px',
        p: { md: '30px', sm: '20px', xs: '10px' },
        width: '100%',
      }}
    >
      {!!heading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '30px',
          }}
        >
          <Typography variant="h3" color="primary.light">
            {heading}
          </Typography>
          {headingSibling}
        </Box>
      )}
      {children}
    </Box>
  );
};
