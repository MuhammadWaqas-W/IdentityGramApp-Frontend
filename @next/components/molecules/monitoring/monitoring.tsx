import React, { useCallback, useMemo, useState } from 'react';
import { useGetTableData } from '@hooks';
import { apiGetRequest, apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';
import { REQUEST_STATUS } from '@constants';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import Image from 'next/image';
import { CustomTable, TableHeader, ViewMonitoringModal } from '@molecules';
import { Status } from '@atoms';
import { share } from '@icons';
import moment from 'moment';

export const MonitoringMolecule = ({ IntegrationID, integrationName }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.IDEL);
  const router = useRouter();

  const onResentWebhook = useCallback(
    async (monitoringDetails: any) => {
      setRequestStatus(REQUEST_STATUS.LOADING);
      let message = null;
      try {
        const res: any = await apiPostRequest(
          `/integration/${monitoringDetails?.integrationId}/resend-monitoring/${monitoringDetails?.id}`,
          {},
        );
        const { data, status } = res;
        switch (status) {
          case 201:
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            enqueueSnackbar(data?.message, {
              variant: 'success',
            });
            break;
          default:
            setRequestStatus(REQUEST_STATUS.FAILURE);
            message = data?.message || 'Something went wrong';
            break;
        }
      } catch (error: any) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        message = error || 'Something went wrong';
        enqueueSnackbar(message, {
          variant: 'error',
        });
      } finally {
        setRequestStatus(REQUEST_STATUS.IDEL);
      }
    },
    [enqueueSnackbar, router],
  );

  const res = ({ limit, offset }: any) => {
    const payload = { limit, offset };
    return apiGetRequest(
      `/integration/${IntegrationID}/monitorings`,
      null,
      payload,
    );
  };

  const querydata = useMemo(() => {
    return {
      key: `/integration/${IntegrationID}/monitorings`,
      apiFunc: res,
    };
  }, []);

  const {
    data,
    isError,
    isLoading,
    isFetching,
    limit,
    currentPage,
    setCurrentPage,
    setSortBy,
    setSort,
  } = useGetTableData(querydata);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Status
              title={
                row?.webhookResponse?.statusCode === 200
                  ? row?.webhookResponse?.statusCode + ' Created'
                  : row?.webhookResponse?.statusCode + ' Bad request'
              }
              color={
                row?.webhookResponse?.statusCode === 200 ? '#065F46' : '#B45050'
              }
              bgColor={
                row?.webhookResponse?.statusCode === 200 ? '#D1FAE5' : '#FEE2E2'
              }
              styleWrapper={{ width: 'fit-content' }}
            />
          </Box>
        ),
        id: 'code',
        cell: (info: any) => info.getValue(),
        header: () => <span>CODE</span>,
      },
      {
        accessorFn: (row: any) => row?.updatedAt ?? '---',
        id: 'lasteUpdate',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '-',
        header: () => <span>LASTE UPDATE</span>,
      },
      {
        accessorFn: (row: any) => integrationName ?? '---',
        id: 'userName',
        cell: (info: any) => info.getValue(),
        header: () => <span>Integration Name</span>,
      },
      {
        accessorFn: (row: any) => row?.monitoringDetails?.status ?? '---',
        id: 'status',
        cell: (info: any) => info.getValue(),
        header: () => <span>STATUS</span>,
      },
      {
        accessorFn: (row: any) => row?.monitoringDetails?.documentType ?? '---',
        id: 'type',
        cell: (info: any) => info.getValue(),
        header: () => <span>TYPE</span>,
      },
      {
        accessorFn: (row: any) => row?._id ?? '---',
        id: 'uuid',
        cell: (info: any) => info.getValue(),
        header: () => <span>UUID</span>,
      },
      {
        accessorFn: (row: any) => row?.action ?? '---',
        id: 'action',
        cell: (info: any) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ViewMonitoringModal
              requestUrl={info?.row?.original?.monitoringDetails?.requestUrl}
              code={info?.row?.original?.webhookResponse?.statusCode}
              webHookSent={info?.row?.original?.createdAt}
              requestBody={
                info?.row?.original?.monitoringDetails?.verificationDetails
              }
              responseBody={info?.row?.original?.webhookResponse}
            />
            <Image
              src={share}
              alt="share"
              style={{ marginLeft: 2, marginTop: 2, cursor: 'pointer' }}
              onClick={() =>
                onResentWebhook(info?.row?.original?.monitoringDetails)
              }
            />
          </Box>
        ),
        header: () => <span>ACTION</span>,
      },
    ],
    [onResentWebhook, requestStatus],
  );

  return (
    <React.Fragment>
      <TableHeader isRow3rd={false} />
      <CustomTable
        data={data?.data?.data.monitorings}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={true}
        count={Math.ceil(data?.data?.data?.meta?.total / limit)}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSortBy={setSortBy}
        setSort={setSort}
      />
    </React.Fragment>
  );
};
