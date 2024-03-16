import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useChangeTableData, useGetTableData } from '@hooks';
import { CustomTable, TableHeader } from '@molecules';
import { endpoints } from '@config';
import { apiGetRequest, apiPatchRequest, apiPostRequest } from '@helpers';
import { useSnackbar } from 'notistack';
import { UserName } from '@atoms';
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import { edit } from '@icons';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { PermissionsModal } from '@organisms';
import { userAvatar } from '@icons';

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
        queryKey: [`${endpoints.getUsersListSuperAdmin}roles`],
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
        queryKey: [`${endpoints.getUsersListSuperAdmin}roles`],
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
        queryKey: [`${endpoints.getUsersListSuperAdmin}roles`],
      },
    ],
  },
};

const filterData = (rawData: any) => {
  if (!rawData) return [];
  return rawData?.filter((item: any, index: number) => {
    return item?.userPermissions?.length !== 0;
  });
};

export const RolesAndRightsOrg = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [rowData, setRowData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  
  const res = ({ offset, limit, searchTerm: search }: any) => {
    const payload = { offset, limit, search };
    return apiGetRequest(endpoints?.getUsersListSuperAdmin, null, payload);
  };

  const querydata = useMemo(() => {
    return {
      key: endpoints?.getUsersListSuperAdmin + 'roles',
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
    currentPage,
    setCurrentPage,
    setLimit,
    setSortBy,
    setSort,
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
        accessorFn: (row: any) => row?.createdAt ?? '-',
        id: 'createdAt',
        cell: (info: any) => info.getValue(),
        header: () => <span>ASSIGNED DATE</span>,
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
    <Box>
      <TableHeader
        limit={limit}
        setLimit={setLimit}
        clearAllBtnHandle={false}
        setCustomButton={
          <PermissionsModal
            usersList={data?.data?.data?.users}
            open={open}
            setOpen={setOpen}
            type={type}
            setType={setType}
            rowData={rowData}
            handleAddorEdit={handleAddorEdit}
            isLoading={isLoadingMutation}
          />
        }
      />
      <CustomTable
        data={filterData(data?.data?.data?.users)}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={Math.ceil(data?.data?.meta?.total / limit)}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSortBy={setSortBy}
        setSort={setSort}
      />
    </Box>
  );
};
