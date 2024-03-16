import { Box, Grid, Skeleton, Typography } from '@mui/material';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import React, { useEffect, useMemo, useState } from 'react';
import { APIList } from '@constants';
import { apiGetRequest } from '@helpers';
import { endpoints } from '@config';
import { useGetTableData } from '@hooks';
import Link from 'next/link';

export const DashboardApisDeatails = () => {
  const [apisCount, setApisCount] = useState<any>([]);
  const res = () => {
    return apiGetRequest(endpoints?.apisCount);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.apisCount,
      apiFunc: res,
    };
  }, []);
  const { data, isError, isSuccess, isLoading } = useGetTableData(querydata);
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      const tempArr = data?.data?.data;
      setApisCount(tempArr);
    }
  }, [data?.data?.data]);
  return (
    <>
      <Grid container justifyContent="center" spacing={1}>
        {APIList.map((item) => (
          <Grid key={item.id} item sm={4} xs={12}>
            <Box
              sx={{
                display: { sm: 'block', xs: 'flex' },
                justifyContent: 'center',
                borderRight: {
                  sm: item.id != 4 ? '1px dashed #D1D3E7' : 'none',
                  xs: 'none',
                },
                mr: { sm: '40px' },
                mb: '35px',
                mt: '30px',
              }}
            >
              <Link
                href={`apis/total-apis?hitType=${item.path}`}
                style={{ textDecoration: 'none' }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant="h4"
                    sx={{ color: 'secondary.lighter', whiteSpace: 'nowrap' }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      width: '24px',
                      height: '24px',
                      bgcolor: item.bgColor,
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      ml: '13px',
                    }}
                  >
                    <NorthRoundedIcon
                      sx={{
                        fontSize: '12px',
                        color: item.color,
                        rotate: item.id != 4 ? '0deg' : '180deg',
                      }}
                    />
                  </Box>
                </Box>
                {isSuccess && (
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 'fontWeightMedium',
                      color: 'primary.dark',
                      alignItems: 'flex-end',
                      flexWrap: 'wrap',
                      display: 'inline-flex',
                      height: '50px',
                      cursor: 'pointer',
                      transition: 'all .2s ease',
                      '&:hover': { color: item.color, fontSize: '34.3061px' },
                    }}
                  >
                    {apisCount[item.key] ? apisCount[item.key] : 0}
                  </Typography>
                )}
                {isLoading && (
                  <Skeleton variant="rounded" width={60} height={40} />
                )}
                {isError && (
                  <Typography
                    variant="h2"
                    title="Something went Wrong"
                    sx={{
                      fontWeight: 'fontWeightMedium',
                      color: 'primary.dark',
                    }}
                  >
                    ---
                  </Typography>
                )}
                <Typography variant="subtitle2" sx={{ color: 'primary.dark' }}>
                  Current count
                </Typography>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
