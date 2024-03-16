import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useChangeTableData, useGetTableData } from '@hooks';
import { AddUserMol, CustomTable, TableHeader } from '@molecules';
import { awsBaseUrl, endpoints } from '@config';
import { apiGetRequest, apiPatchRequest, apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';
import { REQUEST_STATUS } from '@constants';
import { UserName } from '@atoms';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import { edit, userAvatar } from '@icons';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import moment from 'moment';
import { userAgent } from 'next/server';

const addMutationData = {
  apiFunc: ({ firstName, lastName, email, companyId, contactNumber }: any) => {
    const payload = {
      firstName,
      lastName,
      email,
      contactNumber,
      defaultRole: 'COMPANY_ADMIN',
      companyId: companyId?.value,
    };
    return apiPostRequest(endpoints?.signup, payload);
  },
  invalidationMeta: {
    keys: [
      {
        queryKey: [endpoints.getUsersListSuperAdmin],
      },
    ],
  },
};
// Submit Edit User Mutaion Meta
const editMutationData = {
  apiFunc: ({ firstName, lastName, userId, contactNumber }: any) => {
    const payload = { firstName, lastName, userId, contactNumber };
    return apiPatchRequest(endpoints?.editUserSuperAdmin, payload);
  },
  invalidationMeta: {
    keys: [
      {
        queryKey: [endpoints.getUsersListSuperAdmin],
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
        queryKey: [endpoints.getUsersListSuperAdmin],
      },
    ],
  },
};

export const ManageUsersOrg = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [rowData, setRowData] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const res = ({ offset, limit, searchTerm: search }: any) => {
    const payload = { offset, limit, search };
    return apiGetRequest(endpoints?.getUsersListSuperAdmin, null, payload);
  };

  const querydata = useMemo(() => {
    return {
      key: endpoints?.getUsersListSuperAdmin,
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
    setSelect2,
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
  const handleStatusClick = (row: any) => {
    const formData: any = { status: !row?.isActive, userId: row?._id };
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
        header: () => <Box>USER NAME</Box>,
      },
      {
        accessorFn: (row: any) => row?.defaultRole ?? '-',
        id: 'defaultRole',
        cell: (info: any) => info.getValue(),
        header: () => <span>USER TYPE</span>,
      },
      {
        accessorFn: (row: any) => row?.companytitle ?? '-',
        id: 'companytitle',
        cell: (info: any) => info.getValue(),
        header: () => <span>PRODUCT TITLE</span>,
      },
      {
        accessorFn: (row: any) => row?.createdAt ?? '-',
        id: 'createdAt',
        cell: (info: any) =>
          moment(info.getValue()).format('DD MMM HH:mm') ?? '-',

        header: () => <span>CREATED DATE</span>,
      },
      {
        accessorFn: (row: any) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Switch
              defaultChecked={row?.isActive}
              onClick={() => handleStatusClick(row)}
            />
          </Box>
        ),
        id: 'isActive',
        cell: (info: any) => info.getValue(),
        header: () => <span>STATUS</span>,
      },
      {
        accessorFn: (row: any) => row?.actions ?? '-',
        id: 'action',
        cell: (info: any) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '10px',
            }}
          >
            <VisibilityOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setTitle('User Details');
                setType('View');
                setOpen(true);
                setRowData(info?.row?.original);
              }}
            />
            <Image
              src={edit}
              alt=""
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpen(true);
                setTitle('Update User');
                setType('Update');
                setRowData(info?.row?.original);
              }}
            />
          </Box>
        ),
        header: () => <span>ACTION</span>,
      },
    ],
    [],
  );
  return (
    <React.Fragment>
      <Box>
        <TableHeader
          handleClearFilter={clearFilter}
          limit={limit}
          filter={filter}
          setFilter={setFilter}
          setLimit={setLimit}
          clearAllBtnHandle={true}
          setCustomButton={
            <AddUserMol
              open={open}
              setOpen={setOpen}
              setTitle={setTitle}
              title={title}
              type={type}
              setType={setType}
              rowData={rowData}
              handleAddorEdit={handleAddorEdit}
              isLoading={isLoadingMutation}
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
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSortBy={setSortBy}
          setSort={setSort}
        />
      </Box>
    </React.Fragment>
  );
};
