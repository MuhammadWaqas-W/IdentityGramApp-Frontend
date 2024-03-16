import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { Box } from '@mui/material';
import { useAppSelector, useGetTableData } from '@hooks';
import { CustomTable, NotificationModal, TableHeader } from '@molecules';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { UserName } from '@atoms';
import moment from 'moment';
import { userAvatar } from '@icons';

export const Notifications = (): JSX.Element => {
  const [noticeType, setNoticeType] = useState('');
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const resetFunc = () => {
    setNoticeType('');
  };

  const ColFilterOptions = useMemo(() => {
    return [
      role !== 'SIMPLE_USER' && {
        type: 'select',
        defaultValue: noticeType,
        Options: [
          { label: 'Notice Type', value: '' },
          { label: 'Email Notice', value: 'emailnotice' },
          { label: 'Push Notifications', value: 'pushnotification' },
          { label: 'System Notice', value: 'systemnotice' },
        ],
        OnChange: ({ target }: any) => setNoticeType(target?.value),
      },
    ];
  }, [noticeType]);

  const res = ({
    limit,
    offset,
    searchTerm: search,
    from: dateFrom,
    to: dateTo,
  }: any) => {
    const payload = {
      limit,
      noticeType,
      offset,
      search,
      date: dateTo,
    };
    return apiGetRequest(endpoints?.notification, null, payload);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.notification,
      apiFunc: res,
      dependencies: { noticeType },
    };
  }, [noticeType]);

  const {
    data,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    limit,
    filter,
    currentPage,
    startDate,
    endDate,
    select2,
    setSelect2,
    setFilter,
    setCurrentPage,
    setLimit,
    setSortBy,
    setSort,
    setStartDate,
    setEndDate,
    clearFilter,
  } = useGetTableData(querydata);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <UserName image={userAvatar} name={row?.name} email={row?.email} />
        ),
        id: 'userName',
        cell: (info: any) => info.getValue(),
        header: (info: any) => <Box>USER NAME</Box>,
      },
      {
        accessorFn: (row: any) => row?.title ?? '-',
        id: 'title',
        cell: (info: any) => info.getValue(),
        header: () => <span>NOTICE NAME</span>,
      },
      {
        accessorFn: (row: any) => row?.type ?? '-',
        id: 'type',
        cell: (info: any) => info.getValue(),
        header: () => <span>NOTICE TYPE</span>,
      },
      {
        accessorFn: (row: any) => row?.createdAt ?? '-',
        id: 'createdAt',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '-',
        header: () => <span>NOTICE DATE</span>,
      },
      {
        accessorFn: (row: any) => row?.action ?? '-',
        id: 'action',
        cell: (info: any) => (
          <NotificationModal message={info?.row?.original?.message} />
        ),
        header: () => <span>ACTION</span>,
      },
    ],
    [],
  );

  const userColumnFilter =
    role === 'SIMPLE_USER'
      ? columns.filter((item: any) => item.id !== 'userName')
      : columns;

  return (
    <React.Fragment>
      <TableHeader
        handleClearFilter={clearFilter}
        colfilter
        ColFilterOptions={ColFilterOptions}
        resetFunc={resetFunc}
        timeframe
        colfilterRow={role === 'SIMPLE_USER' ? false : true}
        limit={limit}
        filter={filter}
        setFilter={setFilter}
        setLimit={setLimit}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        select2={select2}
        setSelect2={setSelect2}
        clearAllBtnHandle
      />
      <CustomTable
        data={data?.data?.data?.notifications}
        columns={userColumnFilter}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={true}
        count={Math.ceil(data?.data?.data?.meta?.total / limit)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSortBy={setSortBy}
        setSort={setSort}
      />
    </React.Fragment>
  );
};

Notifications.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
