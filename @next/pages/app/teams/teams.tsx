import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { Box } from '@mui/material';
import { useAppSelector, useChangeTableData, useGetTableData } from '@hooks';
import { CustomTable, TableHeader } from '@molecules';
import { awsBaseUrl, endpoints } from '@config';
import { apiGetRequest, apiPatchRequest, apiPostRequest } from '@helpers';
import { AccessDenied, AddUserOrganisms } from '@organisms';
import { UserName, Status } from '@atoms';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { edit, userAvatar } from '@icons';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import router from 'next/router';
import { companyRoles } from '@constants';

// Submit Add User Mutaion Meta
const addMutationData = {
  apiFunc: ({ firstName, lastName, email, defaultRole }: any) => {
    const payload = { firstName, lastName, email, defaultRole };
    return apiPostRequest(endpoints?.addUser, payload);
  },
  invalidationMeta: {
    keys: [
      {
        queryKey: [endpoints?.teams],
      },
    ],
  },
};
// Submit Edit User Mutaion Meta
const editMutationData = {
  apiFunc: ({ firstName, lastName, userId, defaultRole }: any) => {
    const payload = { firstName, lastName, defaultRole, userId };
    return apiPatchRequest(endpoints?.editUser, payload);
  },
  invalidationMeta: {
    keys: [
      {
        queryKey: [endpoints?.teams],
      },
    ],
  },
};
// Update Status of User Mutation Meta
const statusMutationData = {
  apiFunc: (payload: any) => {
    return apiPatchRequest(endpoints?.editUserStatus, payload);
  },
  invalidationMeta: {
    keys: [
      {
        queryKey: [endpoints?.teams],
      },
    ],
  },
};

export const Teams = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [rowData, setRowData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const handleClose = () => router?.push('./dashboard');

  const ColFilterOptions = useMemo(() => {
    return [
      {
        type: 'checkbox',
        Lable: 'Status',
        OnChange: undefined,
      },
    ];
  }, []);

  const res = ({ offset, limit, searchTerm: search }: any) => {
    const payload = { offset, limit, search };
    return apiGetRequest(endpoints?.teams, null, payload);
  };

  const querydata = useMemo(() => {
    return {
      key: endpoints?.teams,
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
  const { isLoading: isLoadingMutation, mutate: addUpdateMutate } =
    useChangeTableData(type === 'Add' ? addMutationData : editMutationData);

  // Hook Call In Order Mutate Status Update
  const { isLoading: isStatusLoadingMutation, mutate: statusMutate } =
    useChangeTableData(statusMutationData);

  // Handle Click Function for Status Update
  const handleStatusClick = (rowData: any) => {
    const formData: any = { status: !rowData.isActive, userId: rowData?._id };
    statusMutate(formData, { onSuccess, onError });
  };
  // Handle Click Function for Add and Update User
  const handleAddorEdit = (values: any) => {
    const formData: any = values;
    addUpdateMutate(formData, { onSuccess, onError });
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
          <UserName
            image={userAvatar}
            name={row?.firstName + ' ' + row?.lastName}
            email={row?.email}
          />
        ),
        id: 'firstName',
        cell: (info: any) => info.getValue(),
        header: () => <span>Name</span>,
      },
      {
        accessorFn: (row: any) => row?.defaultRole ?? '-',
        id: 'defaultRole',
        cell: (info: any) => info.getValue(),
        header: () => <span>Role</span>,
      },
      {
        accessorFn: (row: any) => row?.updatedAt ?? '-',
        id: 'updatedAt',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '-',
        header: () => <span>Last Update</span>,
      },
      {
        accessorFn: (row: any) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Status
              title={row?.isActive ? 'Active' : 'In Active'}
              color={row?.isActive ? '#065F46' : '#FF624E'}
              bgColor={row?.isActive ? '#D1FAE5' : 'rgba(255, 98, 78, 0.12);'}
              styleWrapper={{ width: '111px', cursor: 'pointer' }}
              handleStatusClick={() => handleStatusClick(row)}
              isLoading={isStatusLoadingMutation}
            />
          </Box>
        ),
        id: 'isActive',
        cell: (info: any) => info.getValue(),
        header: () => <span>Status</span>,
      },
      {
        accessorFn: (row: any) => {},
        id: 'Action',
        cell: (info: any) => (
          <Box>
            <VisibilityOutlinedIcon
              sx={{ color: '#6E7191', cursor: 'pointer' }}
              onClick={() => {
                setTitle('User');
                setType('View');
                setOpen(true);
                setRowData(info?.row?.original);
              }}
            />
            <Image
              src={edit}
              alt=""
              style={{ cursor: 'pointer', color: '#6E7191' }}
              onClick={() => {
                setTitle('Update User');
                setType('Update');
                setOpen(true);
                setRowData(info?.row?.original);
              }}
            />
          </Box>
        ),
        header: () => <span>Actions</span>,
      },
    ],
    [],
  );
  if (!companyRoles.includes(role)) {
    return <AccessDenied open={true} handleClose={handleClose} />;
  }
  return (
    <Box>
      <TableHeader
        handleClearFilter={clearFilter}
        ColFilterOptions={ColFilterOptions}
        colfilter={false}
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
        clearAllBtnHandle={true}
        setCustomButton={
          <AddUserOrganisms
            handleAddorEdit={handleAddorEdit}
            isLoading={isLoadingMutation}
            open={open}
            setOpen={setOpen}
            title={title}
            setTitle={setTitle}
            type={type}
            setType={setType}
            rowData={rowData}
          />
        }
      />
      <CustomTable
        data={data?.data?.data?.users}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={Math.ceil(data?.data?.data?.meta?.total / limit)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSortBy={setSortBy}
        setSort={setSort}
      />
    </Box>
  );
};

Teams.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);
