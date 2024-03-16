import React from 'react';
import { Box } from '@mui/material';
import { NoContent } from '@svgs';
import Image from 'next/image';

export const NoContentFound = (): JSX.Element => {
  return (
    <Box display={'flex'}>
      <Image src={NoContent} alt="" />
    </Box>
  );
};
