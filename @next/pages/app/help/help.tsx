import React from 'react';
import { DashboardLayout } from '@layouts';
import { HelpOrganism } from '@organisms';

export const Help = (): JSX.Element => (
  <div>
    <HelpOrganism />
  </div>
);

Help.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
