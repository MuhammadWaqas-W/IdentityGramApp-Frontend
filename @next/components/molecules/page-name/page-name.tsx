import React from 'react';
import { Box } from '@mui/material';
import { BreadcrumbsAtom, MainHeadingAtom } from '@atoms';
import { useRouter } from 'next/router';

export const PageName = () => {
  const router = useRouter();
  const { pathname } = router;
  const lastPath = pathname
    .split('/')
    .pop()
    ?.replace(/[\[\]\-_]/g, ' ')
    .trim();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'column',
          pl: 3,
        }}
      >
        <MainHeadingAtom heading={lastPath} />
        <BreadcrumbsAtom />
      </Box>
    </React.Fragment>
  );
};
