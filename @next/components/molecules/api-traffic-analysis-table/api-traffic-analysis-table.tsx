import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { CustomTable } from '../custom-table';
import { TableHeader } from '../custom-table-header';
import { CustomSelect, Status } from '@atoms';
import { endpoints } from '@config';
import { useGetTableData } from '@hooks';
import { apiGetRequest } from '@helpers';

export const ApiTrafficAnalysisTable = ({ type }: any) => {
  const router = useRouter();
  const [linkType, setLinkType] = useState('All');
  const [apiLogs, setApiLogs] = useState<any>([]);
  useEffect(() => {
    setLinkType(
      type === 'failure-hits'
        ? 'Failure'
        : type === 'call-hits'
        ? 'Success'
        : 'All',
    );
  }, [type]);
  const res = ({ offset, limit, searchTerm: search }: any) => {
    const payload = {
      offset,
      limit,
      search,
      status: linkType === 'Failure' ? 'Failed' : linkType,
    };
    return apiGetRequest(endpoints?.apisLogs, null, payload);
  };
  const querydata = useMemo(() => {
    return {
      key: endpoints?.apisLogs,
      apiFunc: res,
      dependencies: { linkType },
    };
  }, [linkType]);

  const {
    data,
    isError,
    isSuccess,
    isLoading,
    isFetching,
    limit,
    filter,
    currentPage,
    setFilter,
    setCurrentPage,
    setLimit,
  } = useGetTableData(querydata);
  useEffect(() => {
    if (data?.data?.data !== null) {
      const tempArr = data?.data?.data?.api_logs;
      setApiLogs(tempArr);
    }
  }, [data?.data]);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) =>
          <Box sx={{ display: 'flex', color: '#2E285C' }}>{row.apiName}</Box> ??
          '-',
        id: 'apiName',
        cell: (info: any) => info.getValue(),
        header: () => <span>API Name</span>,
      },
      {
        accessorFn: (row: any) => row?.apiUrl ?? '-',
        id: 'apiService',
        cell: (info: any) => info.getValue(),
        header: () => <span>API Service</span>,
      },
      {
        accessorFn: (row: any) => row?.company?.title ?? '-',
        id: 'productTitle',
        cell: (info: any) => info.getValue(),
        header: () => <span>Product title</span>,
      },
      {
        accessorFn: (row: any) =>
          (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Status
                title={row?.status === 'Success' ? 'Success' : 'Failure'}
                color={row?.status === 'Success' ? '#065F46' : '#FF624E'}
                bgColor={
                  row?.status === 'Success'
                    ? '#D1FAE5'
                    : 'rgba(255, 98, 78, 0.12);'
                }
                styleWrapper={{ width: '111px' }}
              />
            </Box>
          ) ?? '-',
        id: 'hitType',
        cell: (info: any) => info.getValue(),
        header: () => <span>Hit type</span>,
      },
      // {
      //     accessorFn: (row: any) => row?.hitCount ?? '-',
      //     id: 'hitCount',
      //     cell: (info: any) => info.getValue(),
      //     header: () => <span>HIT Count</span>,
      // },
    ],

    [],
  );
  return (
    <>
      <Box>
        <TableHeader
          setLimit={setLimit}
          limit={limit}
          filter={filter}
          setFilter={setFilter}
          colfilterRow
          setCustomButton={
            <CustomSelect
              styleSelect={{
                color: 'secondary.main',
              }}
              styleMenu={{ color: 'secondary.main' }}
              minWidth={170}
              fullWidth
              data={[
                { label: 'All', value: 'All' },
                { label: 'Success', value: 'Success' },
                { label: 'Failure', value: 'Failure' },
              ]}
              name="contentUploadPlatform"
              id="contentUploadPlatform"
              customOnChange={({ target }: any) => {
                setLinkType(target?.value);
                router?.push({
                  pathname: `total-apis`,
                  query: {
                    hitType:
                      target?.value === 'All'
                        ? 'total-apis'
                        : target?.value === 'Success'
                        ? 'call-hits'
                        : 'failure-hits',
                  },
                });
              }}
              customValue={linkType}
              padding={'12px 20px'}
            />
          }
        />
        <CustomTable
          data={apiLogs}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          count={Math.ceil(data?.data?.data?.meta?.total / limit)}
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </>
  );
};
