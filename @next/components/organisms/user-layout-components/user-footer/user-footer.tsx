import React from 'react';
import { Box, Typography } from '@mui/material';

export const UserFooter = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography sx={{ color: '#6E7191', textAlign: 'center' }}>
          Copyrights © 2023 All rights reserved{' '}
          <b style={{ color: '#3C347E' }}>IDENTITY GRAM</b>
        </Typography>
      </Box>
    </React.Fragment>
  );
};
