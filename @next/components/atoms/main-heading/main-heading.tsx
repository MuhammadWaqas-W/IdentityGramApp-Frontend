import React from 'react';
import { Typography } from '@mui/material';

export const MainHeadingAtom = ({ heading }: any) => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{ color: 'primary.dark', textTransform: 'capitalize' }}
      >
        {heading}
      </Typography>
    </>
  );
};
