import React, { useMemo } from 'react';
import { Badge, Box, Grid, Typography } from '@mui/material';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { useGetTableData } from '@hooks';

export const UserRecentVerifications = () => {
  const getSingleUserRecentVerificationData = () => {
    return apiGetRequest(endpoints?.singleUserrecentVerification);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.singleUserrecentVerification,
      apiFunc: getSingleUserRecentVerificationData,
    };
  }, []);
  const { data } = useGetTableData(querydata);
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            width: '100%',
            height: '577px',
            overflowX: 'scroll',
            background: '#FFFFFF',
            border: '1px solid #E8E8EC',
            borderRadius: '16px',
            p: 5,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '@media (max-width: 600px)': {
              p: 2,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mr: 1,
                  color: 'primary.light',
                  '@media (max-width: 600px)': {
                    fontSize: '12px',
                    mr: 0.5,
                  },
                }}
              >
                Recent Verifications
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'rgba(218, 248, 231, 0.46)',
                  width: '25px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  '@media (max-width: 600px)': {
                    width: '20px',
                    height: '18px',
                  },
                }}
              >
                <Badge
                  badgeContent={data?.data?.data?.data.length}
                  color="default"
                  sx={{ color: 'success.main' }}
                />
              </Box>
            </Box>
          </Box>

          <Grid container spacing={2} flexDirection="column">
            {data?.data?.data?.data.map((item: any) => (
              // <Grid container item  >
              <Box
                key={item._id}
                sx={{
                  display: 'flex',
                  width: '100%',
                  p: 2.4,
                  // m: 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 98, 78, 0.02);',
                  },
                  '@media (max-width: 600px)': {
                    mr: 0,
                  },
                }}
              >
                <Box>
                  {/* <Image src={item.profilePic} alt="profile-pic" style={{}} /> */}
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      mb: 1,
                    }}
                  >
                    <Typography
                      // variant="subtitle1"
                      sx={{
                        ml: 2,
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        color: 'primary.dark',
                        '@media (max-width: 600px)': {
                          fontSize: '12px',
                          ml: 1,
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      // variant="body2"
                      sx={{
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        mr: 2,
                        color: 'secondary.lighter',
                        '@media (max-width: 600px)': {
                          fontSize: '9px',
                        },
                      }}
                    >
                      {item.timeElapsed}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      // maxWidth: '100%',
                      ml: 2,
                      color: 'primary.light',
                      '@media (max-width: 600px)': {
                        fontSize: '10px',
                      },
                    }}
                  >
                    {item.message}
                  </Typography>
                </Box>
              </Box>
              // </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
