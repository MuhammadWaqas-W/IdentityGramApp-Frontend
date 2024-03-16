import React, { useEffect, useMemo, useState } from 'react';
import { CustomButton, CustomCheckBox, CustomModel } from '@atoms';
import { Typography, Box, Grid } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CustomMessage, CustomTable, TableHeader } from '@molecules';
import { apiGetRequest, apiPostRequest } from '@helpers';
import { endpoints } from '@config';
import { useSnackbar } from 'notistack';
import { permissionsTableRoles } from '@constants';

export const PermissionsModal = ({
  open,
  setOpen,
  type,
  setType,
  usersList = [],
  rowData,
  handleAddorEdit,
  isLoading,
}: any) => {
  const [status, setStatus] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });

  let data = usersList?.map((item: any, index: number) => {
    return { label: item?.firstName, value: item?._id };
  });

  const ColFilterOptions = useMemo(() => {
    return [
      {
        type: 'select',
        defaultValue: status,
        Options: [{ label: 'Select User', value: '' }, ...data],
        OnChange: ({ target }: any) => setStatus(target?.value),
      },
    ];
  }, [status, data]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row: any) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CustomCheckBox name={row?.label} />
            <Typography variant="h5" textAlign="left">
              {row?.label ?? '-'}
            </Typography>
          </Box>
        ),
        id: 'label',
        cell: (info: any) => info.getValue(),
        header: () => <span></span>,
      },
      {
        id: 'create',
        accessorFn: (row: any) => <CustomCheckBox name={row?.create} />,
        cell: (info: any) => info.getValue(),
        header: () => <span>Create</span>,
      },
      {
        id: 'view',
        accessorFn: (row: any) => <CustomCheckBox name={row?.view} />,
        cell: (info: any) => info.getValue(),
        header: () => <span>View</span>,
      },
      {
        id: 'edit',
        accessorFn: (row: any) => <CustomCheckBox name={row?.edit} />,
        cell: (info: any) => info.getValue(),
        header: () => <span>Edit</span>,
      },
      {
        id: 'delete',
        accessorFn: (row: any) => <CustomCheckBox name={row?.delete} />,
        cell: (info: any) => info.getValue(),
        header: () => <span>Delete</span>,
      },
    ],
    [],
  );

  const handlePermissions = async () => {
    try {
      const payload = {};
      const res: any = await apiPostRequest(endpoints?.signup, payload);
      const { data, status } = res;
      switch (status) {
        case 201:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          setOpen(false);
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error });
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setResponseMessage({ error: null, message: null });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [responseMessage]);

  return (
    <>
      <CustomButton
        onClick={() => {
          setOpen(true);
          setType('Add');
        }}
        width={'150px'}
        padding="9px"
      >
        Permissions
      </CustomButton>
      <CustomModel
        setOpen={setOpen}
        open={open}
        styleModal={{ p: 3, width: { lg: '45%', xs: '80%' } }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 2,
          }}
        >
          <Typography variant="h3" sx={{ color: '#2E285C' }}>
            Permissions
          </Typography>
          <CloseOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item>
            <TableHeader
              clearAllBtnHandle={false}
              isRow3rd={false}
              colfilter
              ColFilterOptions={ColFilterOptions}
            />
            <CustomTable
              data={permissionsTableRoles}
              columns={columns}
              isSuccess={true}
              isPagination={false}
              maxHeight="auto"
              minHeight="auto"
            />
          </Grid>
          <Grid item>
            <CustomMessage
              hasMessage={!!responseMessage?.message}
              text={responseMessage?.message}
              error={responseMessage?.error}
              isBold={true}
            />
          </Grid>
          {type !== 'View' && (
            <Grid item textAlign={'right'} sx={{ m: 2 }}>
              <CustomButton onClick={handlePermissions} width={'150px'}>
                {type}
              </CustomButton>
            </Grid>
          )}
        </Grid>
      </CustomModel>
    </>
  );
};
