import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import {
  DashboardApisDeatails,
  TotalUsersDonutChart,
  DashboardCard,
  DashboardRecentNotification,
  RegisterProductsMolecule,
  VerifiedDocumentBarChart,
  VerificationStatusRadialChart,
} from '@molecules';
import Link from 'next/link';

export const SuperAdminDashboardOrganism = () => {
  const [switchChart, setSwitchChart] = useState('Monthly');

  const onSwitchItem = (item: string) => {
    setSwitchChart(item);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '30px',
              px: 2,
            }}
          >
            <Typography variant="h3" color="primary.light">
              Registered Products
            </Typography>
            <Typography
              component={'div'}
              fontSize="18px"
              color="primary.light"
              fontWeight={'fontWeightRegular'}
            >
              <Link
                href="/app/reports"
                passHref
                style={{ textDecoration: 'none', color: '#6E7191' }}
              >
                View All
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              px: 2,
            }}
          >
            <RegisterProductsMolecule />
          </Box>
        </Grid>
        <Grid item xl={8} xs={12}>
          <DashboardCard heading="Apis">
            <DashboardApisDeatails />
          </DashboardCard>
        </Grid>
        <Grid item xl={4} xs={12}>
          <DashboardCard heading="Total Users">
            <TotalUsersDonutChart />
          </DashboardCard>
        </Grid>
        <Grid item xl={8} xs={12}>
          <DashboardCard heading="Verification Status">
            <VerificationStatusRadialChart />
          </DashboardCard>
        </Grid>
        <Grid item xl={4} xs={12}>
          <DashboardCard heading="Recent Notifications">
            <DashboardRecentNotification />
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', mb: '15px' }}
            >
              <Typography
                variant="h5"
                color="primary.light"
                sx={{
                  textShadow: '0px 64px 96px rgba(60, 52, 126, 0.05)',
                  cursor: 'pointer',
                }}
              >
                <Link
                  href={'/app/notifications'}
                  style={{ textDecoration: 'none', color: '#6E7191' }}
                >
                  View all notifications
                </Link>
              </Typography>
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={12}>
          <VerifiedDocumentBarChart
            chartHeight={360}
            startFrom="Monthly"
            switchChart={switchChart}
            name="Verified Documents"
            onChangeSwitch={onSwitchItem}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
