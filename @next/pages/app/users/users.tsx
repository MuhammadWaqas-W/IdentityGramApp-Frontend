import React from 'react';
import { DashboardLayout } from '@layouts';
import { CustomTabsAtom } from '@atoms';
import { AccessDenied, ManageUsersOrg, RolesAndRightsOrg } from '@organisms';
import { useAppSelector } from '@hooks';
import router from 'next/router';

const tabData = [
  { tabName: 'Manage User', tabContent: <ManageUsersOrg /> },
  { tabName: 'Roles & Rights', tabContent: <RolesAndRightsOrg /> },
];

export const Users = (): JSX.Element => {
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const handleClose = () => router?.push('./dashboard');

  if (role !== 'SUPER_ADMIN') {
    return <AccessDenied open={true} handleClose={handleClose} />;
  }

  return (
    <React.Fragment>
      <ManageUsersOrg />
      {/* <CustomTabsAtom tabData={tabData} /> */}
    </React.Fragment>
  );
};

Users.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
