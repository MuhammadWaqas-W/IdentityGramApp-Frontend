import { Box, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import { REQUEST_STATUS } from '@constants';
import { awsBaseUrl } from '@config';
import { useAppDispatch, useAppSelector } from '@hooks';
import { userAvatar } from '@icons';
import { NoContentFound } from '../no-content-found';
import { useCallback, useEffect, useState } from 'react';
import { getNotification } from '@store';

export const DashboardRecentNotification = () => {
  const { latestNotification, getNotificationDataRequestStatus } =
    useAppSelector((store) => store.notification);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const getLatestNotification = useCallback(async () => {
    try {
      await dispatch(getNotification());
    } catch (error) {}
  }, [dispatch]);
  useEffect(() => {
    getLatestNotification();
  }, [getLatestNotification]);
  useEffect(() => {
    setLoading(getNotificationDataRequestStatus === REQUEST_STATUS.LOADING);
  }, [getNotificationDataRequestStatus]);
  return (
    <>
      {
        <Box
          sx={{
            height: '382px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {(loading || !!latestNotification.length) &&
            [...(loading ? [1, 2, 3, 4] : latestNotification)].map(
              (item: any) => (
                <Box
                  key={item?._id ? item?._id : item}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: '8px',
                    '&:hover': { bgcolor: 'rgba(242, 240, 254, 0.63)' },
                    mb: '15px',
                    height: '82px',
                  }}
                >
                  <Box
                    sx={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      mr: '10px',
                    }}
                  >
                    {loading ? (
                      <Skeleton variant="circular" width={44} height={44} />
                    ) : (
                      <Image
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                        src={userAvatar}
                        width={44}
                        height={44}
                        alt="profile-pic"
                      />
                    )}
                  </Box>
                  <Box sx={{ width: '-webkit-fill-available' }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                        {loading ? (
                          <Skeleton variant="rounded" width={64} height={14} />
                        ) : (
                          item?.name
                        )}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '12px', color: 'secondary.lighter' }}
                      >
                        {loading ? (
                          <Skeleton variant="rounded" width={64} height={14} />
                        ) : (
                          item?.timeElapsed
                        )}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.light',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                      }}
                      title={item?.message}
                    >
                      {loading ? (
                        <Box>
                          {[1, 2].map((item) => (
                            <Skeleton
                              sx={{ mt: 1 }}
                              key={item}
                              variant="rounded"
                              width="100%"
                              height={14}
                            />
                          ))}
                        </Box>
                      ) : (
                        item?.message
                      )}
                    </Typography>
                  </Box>
                </Box>
              ),
            )}
          {!!!latestNotification.length && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <NoContentFound />
            </Box>
          )}
        </Box>
      }
    </>
  );
};
