import React from 'react';
import { NotificationAtom } from '@atoms';
import { Typography, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector } from '@hooks';
import Link from 'next/link';

export const NotificationsOrganism = ({ closeNotification }: any) => {
  const { latestNotification } = useAppSelector((store) => store.notification);
  return (
    <Box
      sx={{
        overflow: 'auto',
        height: '100%',
        maxWidth: 370,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3">
            Recent Notification
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: 'success.lighter',
                fontSize: '14px',
                p: '2px 4px',
                borderRadius: '4px',
                color: 'success.main',
                ml: 1,
              }}
            >
              {latestNotification?.length}
            </Box>
          </Typography>
          <CancelIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => closeNotification(false)}
          />
        </Box>
        {latestNotification?.map((item: any) => (
          <NotificationAtom key={item?._id} item={item} />
        ))}
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          cursor: 'pointer',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          pt: 2,
        }}
      >
        <Link
          href={'/app/notifications'}
          passHref
          style={{ textDecoration: 'none', color: 'primary.dark' }}
          onClick={() => closeNotification(false)}
        >
          View all Notification
        </Link>
      </Box>
    </Box>
  );
};
