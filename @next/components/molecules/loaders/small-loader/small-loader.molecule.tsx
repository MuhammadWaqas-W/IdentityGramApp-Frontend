import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const SmallLoader = ({
  message = undefined,
  isLoader,
  m,
}: any): JSX.Element => {
  if (!isLoader) return <></>;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m,
      }}
    >
      <CircularProgress />
      {message && (
        <Typography variant="body1" sx={{ ml: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};
