import React from 'react';
import { SwipeableDrawer } from '@mui/material';

export const SlideDrawerOrganism = ({
  children,
  open,
  toggleDrawer,
  accountDetail,
}: any) => {
  return (
    <>
      <SwipeableDrawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            display: 'flex',
            width: accountDetail && { lg: 330, md: 290, xs: 240 },
            // maxWidth: 300,
            p: 2,
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
          },
        }}
        onOpen={toggleDrawer}
      >
        {children}
      </SwipeableDrawer>
    </>
  );
};
