import React, { useMemo, useState } from 'react';
import { AddIntegrationMol } from '@molecules';
import { DashboardLayout } from '@layouts';
import { Box } from '@mui/material';
import { useAppSelector, useChangeTableData, useGetTableData } from '@hooks';
import { CustomTable, TableHeader } from '@molecules';
import { endpoints } from '@config';
import { apiGetRequest, apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Status } from '@atoms';
import moment from 'moment';
import { AccessDenied } from '@organisms';
import { companyRoles } from '@constants';

// Submit Add User Mutaion Meta
const addMutationData = {
  apiFunc: ({ name, type }: any) => {
    const payload = { name, type };
    return apiPostRequest(endpoints?.addIntegration, payload);
  },
  invalidationMeta: {
    keys: [
      {
        queryKey: [endpoints?.getIntegrationList],
      },
    ],
  },
};

export const Integrations = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const res = ({ offset, limit, searchTerm: search }: any) => {
    const payload = { offset, limit, search };
    return apiGetRequest(endpoints?.getIntegrationList, null, payload);
  };

  const querydata = useMemo(() => {
    return {
      key: endpoints?.getIntegrationList,
      apiFunc: res,
    };
  }, []);
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
    setSortBy,
    setSort,
    clearFilter,
  } = useGetTableData(querydata);

  // Hook Call In Order to Mutate Add and Edit Data
  const { isLoading: isLoadingMutation, mutate: addMutate } =
    useChangeTableData(addMutationData);

  // Handle Click Function for Add and Update User
  const handleAddorEdit = (values: any) => {
    const formData: any = values;
    addMutate(formData, { onSuccess, onError });
  };

  // Succcess and Error Messages Handlers
  const onSuccess = ({ data }: any) => {
    enqueueSnackbar(data?.message || 'SuccessFully', {
      variant: 'success',
    });
    setOpen(false);
  };
  const onError = (error: any) => {
    enqueueSnackbar(error || 'Something Went Wrong', {
      variant: 'error',
    });
  };
  // Succcess and Error Messages Handlers
  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <Box textAlign="left">{row?.name ?? '-'}</Box>
        ),
        id: 'name',
        cell: (info: any) => info.getValue(),
        header: () => <Box>Integration Name</Box>,
      },
      {
        accessorFn: (row: any) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Status
              title={row?.type + ' Integration'}
              color={row?.type === 'Live' ? '#065F46' : '#962BDD'}
              bgColor={row?.type === 'Live' ? '#D1FAE5' : '#F7E8FF'}
              // styleWrapper={{ width: 'fit-content' }}
            />
          </Box>
        ),
        id: 'type',
        cell: (info: any) => info.getValue(),
        header: () => <Box>STATUS</Box>,
      },
      {
        accessorFn: (row: any) => row?.createdAt ?? '-',
        id: 'createdAt',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '-',
        header: () => <Box>Created Date</Box>,
      },
      {
        accessorFn: (row: any) => {
          let passport = row?.documents?.passport ? 'Passport' : '---';
          let drivingLicense = row?.documents?.drivingLicense
            ? 'Driving License'
            : '---';
          let proofOfAddress = row?.documents?.proofOfAddress
            ? 'Proof Of Address'
            : '---';
          let residencePermit = row?.documents?.residencePermit
            ? 'Residence Permit'
            : '---';
          let documents = [
            passport,
            drivingLicense,
            proofOfAddress,
            residencePermit,
          ];
          documents = documents.filter((doc) => doc !== '');
          let documentsList = documents.join(', ');
          if (documentsList === '') {
            documentsList = '-';
          }
          return documentsList;
        },
        id: 'documents',
        cell: (info: any) => info.getValue(),
        header: () => <span>DOCUMENT Type</span>,
      },

      {
        accessorFn: (row: any) => row?.action ?? '-',
        id: 'action',
        cell: (info: any) => (
          <VisibilityOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              router?.push(`/app/integration//${info?.row?.original?._id}`);
            }}
          />
        ),
        header: () => <span>ACTION</span>,
      },
    ],
    [],
  );

  const handleClose = () => router?.push('./dashboard');
  if (!companyRoles.includes(role)) {
    return <AccessDenied open={true} handleClose={handleClose} />;
  }

  return (
    <React.Fragment>
      <TableHeader
        handleClearFilter={clearFilter}
        limit={limit}
        filter={filter}
        setFilter={setFilter}
        setLimit={setLimit}
        clearAllBtnHandle
        setCustomButton={
          <AddIntegrationMol
            handleAddorEdit={handleAddorEdit}
            isLoading={isLoadingMutation}
            open={open}
            setOpen={setOpen}
          />
        }
      />
      <CustomTable
        data={data?.data?.data?.integrations}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
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

Integrations.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
