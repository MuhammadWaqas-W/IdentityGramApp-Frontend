import React, { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetTableData } from '@hooks';
import { CustomTable } from '@molecules';
import { endpoints } from '@config';
import { apiGetRequest } from '@helpers';
import { REQUEST_STATUS } from '@constants';
import { UserName } from '@atoms';
import { Status } from '@atoms';
import moment from 'moment';
import { userAvatar } from '@icons';

export const RecentVerificationsMolecule = (): JSX.Element => {
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.IDEL);
  const router = useRouter();

  const res = () => {
    return apiGetRequest(endpoints?.verificationLatest, null);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.verificationLatest,
      apiFunc: res,
    };
  }, []);

  const { data, isError, isSuccess, isLoading, isFetching } =
    useGetTableData(querydata);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <UserName
            image={userAvatar}
            name={`${row?.firstName ?? '-'} ${row?.lastName}`}
          />
        ),
        id: 'userName',
        cell: (info: any) => info.getValue(),
        header: () => <Box>NAME</Box>,
      },
      {
        accessorFn: (row: any) => row?.documentType ?? '-',
        id: 'documentType',
        cell: (info: any) => info.getValue(),
        header: () => <span>DOCUMENT TYPE</span>,
      },
      {
        accessorFn: (row: any) =>
          moment(row?.updatedAt).format('DD MMM HH:mm') ?? '-',
        id: 'lastUpdate',
        cell: (info: any) => info.getValue(),
        header: () => <span>LAST UPDATE</span>,
      },
      {
        accessorFn: (row: any) =>
          row?.status ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Status
                title={row.status}
                color={
                  row.status === 'Declined'
                    ? '#B45050'
                    : row.status === 'Approved'
                    ? '#065F46'
                    : row.status === 'Not Started'
                    ? '#950F61'
                    : row.status === 'Expired'
                    ? '#FF624E'
                    : row.status === 'Abandoned'
                    ? '#816405'
                    : row.status === 'Started'
                    ? '#645CAA'
                    : row.status === 'Submitted'
                    ? '#0243BC'
                    : '-'
                }
                bgColor={
                  row.status === 'Declined'
                    ? 'rgba(254, 226, 226, 1)'
                    : row.status === 'Approved'
                    ? 'rgba(209, 250, 229, 1)'
                    : row.status === 'Not Started'
                    ? 'rgba(255, 240, 255, 1)'
                    : row.status === 'Expired'
                    ? 'rgba(255, 98, 78, 0.12)'
                    : row.status === 'Abandoned'
                    ? '#FFE99F'
                    : row.status === 'Started'
                    ? '#F5F4FF'
                    : row.status === 'Submitted'
                    ? '#D1E1FF'
                    : '-'
                }
              />
            </Box>
          ) : (
            '-'
          ),
        id: 'status',
        cell: (info: any) => info.getValue(),
        header: () => <span>STATUS</span>,
      },
    ],
    [requestStatus],
  );

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h3" sx={{ color: 'primary.light' }}>
          Recent Verifications
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'primary.light', cursor: 'pointer' }}
          onClick={() => {
            router.push('/app/verifications');
          }}
        >
          View All
        </Typography>
      </Box>
      <CustomTable
        data={data?.data?.data}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        minHeight={180}
        isPagination={false}
      />
    </React.Fragment>
  );
};
