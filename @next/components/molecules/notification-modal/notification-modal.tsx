import { CustomModel } from '@atoms';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { notificationBell } from '@icons';
import Image from 'next/image';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export function NotificationModal({ message }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
        <VisibilityOutlinedIcon />
      </Box>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{
          minheight: 'fit-content',
          height: '30px !important',
          width: { lg: '35%', xs: '80%' },
          //   innerHeight: '100px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 1,
          }}
        >
          <Image src={notificationBell} alt="notificationBell" />
          <CloseOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <Typography variant="h3" sx={{ color: 'primary.dark', mt: 2 }}>
          Identity Gram Sign Up
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: 'primary.light', mt: 2, fontWeight: 400 }}
        >
          {message}
        </Typography>
      </CustomModel>
    </>
  );
}
