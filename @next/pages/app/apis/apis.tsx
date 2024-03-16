import React, { useCallback, useEffect } from 'react';
import { DashboardLayout } from '@layouts';
import { Grid } from '@mui/material';
import {
  ApiCandleStickChart,
  ApiCatalogue,
  ApiPerformanceSummary,
  ApiUsageMetrics,
} from '@molecules';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getApisData } from '@store';
import router from 'next/router';
import { AccessDenied } from '@organisms';

export const Apis = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const getLatestApis = useCallback(async () => {
    try {
      await dispatch(getApisData());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getLatestApis();
  }, [getLatestApis]);

  useEffect(() => {
    const interval = setInterval(() => {
      getLatestApis();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => router?.push('./dashboard');

  if (role !== 'SUPER_ADMIN') {
    return <AccessDenied open={true} handleClose={handleClose} />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}></Grid>
      <Grid item xl={8} xs={12}>
        <Grid container sx={{ display: 'flex' }} spacing={3}>
          <Grid item xs={12}>
            <ApiPerformanceSummary />
          </Grid>
          <Grid item xs={12}>
            <ApiCandleStickChart />
          </Grid>
          <Grid item xs={12}>
            <ApiCatalogue />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={4} xs={12}>
        <ApiUsageMetrics />
      </Grid>
    </Grid>
  );
};

Apis.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
