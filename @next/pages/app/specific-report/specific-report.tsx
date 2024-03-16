import React from 'react';
import { DashboardLayout } from '@layouts';
import { SpecificReportOrganisms } from '@organisms';

export const SpecificReport = (): JSX.Element => (
  <React.Fragment>
    <SpecificReportOrganisms />
  </React.Fragment>
);

SpecificReport.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
