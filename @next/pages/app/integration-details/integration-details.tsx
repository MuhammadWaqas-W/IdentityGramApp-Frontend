import React from 'react';
import { DashboardLayout } from '@layouts';
import { IntegrationDetailsOrganism } from '@organisms';

export const IntegrationDetails = () => {
  return <IntegrationDetailsOrganism />;
};

IntegrationDetails.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
