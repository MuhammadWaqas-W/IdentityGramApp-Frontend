import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { TotalUsersDonutChartOptions } from '@next/constants/chart-options/chart-options';
import { Box, Grid, Stack } from '@mui/material';
import { apiGetRequest } from '@helpers';
import { endpoints } from '@config';
import { useGetTableData } from '@hooks';
import { Skeleton } from '@mui/material';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const TotalUsersDonutChart = () => {
  const [usersCount, setUsersCount] = useState<any>();
  const res = () => {
    return apiGetRequest(endpoints?.usersCount);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.usersCount,
      apiFunc: res,
    };
  }, []);
  const { data, isError, isSuccess, isLoading } = useGetTableData(querydata);
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      const tempObj = data?.data?.data;
      setUsersCount(tempObj);
    }
  }, [data?.data?.data]);
  return (
    <>
      {isLoading && (
        <>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={0}>
              <Stack spacing={1}>
                {[1, 2].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rounded"
                    width="100%"
                    height="65.516px"
                  />
                ))}
              </Stack>
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Skeleton variant="rounded" width="100%" height="145.516px" />
            </Grid>
          </Grid>
        </>
      )}
      {isSuccess && usersCount && (
        <Box>
          <Chart
            series={[usersCount?.ActiveUsers, usersCount?.InActiveUsers]}
            options={TotalUsersDonutChartOptions(
              usersCount?.ActiveUsers + usersCount?.InActiveUsers,
            )}
            type="donut"
            height={162}
          />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            height: '169px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '18px',
          }}
        >
          Something went wrong
        </Box>
      )}
    </>
  );
};
