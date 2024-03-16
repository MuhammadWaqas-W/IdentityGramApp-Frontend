import React from 'react';
import { VerificationsDetailOrg } from '@organisms';
import { DashboardLayout } from '@layouts';

export const VerificationsDetail = () => {
  return (
    <React.Fragment>
      <VerificationsDetailOrg />
    </React.Fragment>
  );
};

VerificationsDetail.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
