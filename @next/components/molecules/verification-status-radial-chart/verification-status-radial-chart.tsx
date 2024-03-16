import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { VerificationStatusRadialChartOptions } from '@next/constants/chart-options/chart-options';
import { Box, Grid, Skeleton, Stack } from '@mui/material';
import { apiGetRequest } from '@helpers';
import { useGetTableData } from '@hooks';
import { endpoints } from '@config';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const totalCount = (arr:any):any => Object.entries(arr).filter(([key]) => !(["Total", "Submitted"].includes(key))).map(([_,val]) => val).reduce((partialSum:any, a:any) => partialSum + a, 0);

export const VerificationStatusRadialChart = () => {
  const [documentValue, setDocumentValue] = useState<any>([]);
  const res = () => {
    return apiGetRequest(endpoints?.verificationCount);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationCount,
      apiFunc: res,
    };
  }, []);
  const { data, isError, isSuccess, isLoading } = useGetTableData(querydata);
  useEffect(() => {
    if (typeof data?.data?.data === 'object' && data?.data?.data !== null) {
      const tempArr = data?.data?.data;
      const total:number = totalCount(tempArr);
      const valueToPercent = (value:number) => {
        return ((value * 100) / total)
      }
      setDocumentValue([
        valueToPercent(tempArr?.Started) ?? 0,
        valueToPercent(tempArr?.Abandoned) ?? 0,
        valueToPercent(tempArr?.Approved) ?? 0,
        valueToPercent(tempArr?.NotStarted) ?? 0,
        valueToPercent(tempArr?.Expired) ?? 0,
        valueToPercent(tempArr?.Declined) ?? 0,
      ]);
    }
  }, [data?.data?.data]);

  return (
    <>
      {isLoading && (
        <>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={0}>
              <Stack spacing={1}>
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rounded"
                    width="100%"
                    height="100.516px"
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
              <Skeleton variant="rounded" width="90%" height="406.516px" />
            </Grid>
          </Grid>
        </>
      )}
      {isSuccess && documentValue && (
        <>
          <style>
            {`.verification-status .apexcharts-legend{
          flex-wrap: wrap;
          width: 50%;
        }`}
          </style>
          <Box
            sx={{ overflowX: 'auto', overflowY: 'hidden' }}
            className="verification-status"
          >
            <Chart
              series={documentValue}
              options={VerificationStatusRadialChartOptions(totalCount(data?.data?.data))}
              type="radialBar"
              height={433.15}
            />
          </Box>
        </>
      )}
      {isError && (
        <Box
          sx={{
            height: '418.516px',
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
