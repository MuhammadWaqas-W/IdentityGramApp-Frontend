import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomModel,
  CustomTextField,
  CustomReactSelect,
} from '@atoms';
import { Box, Grid, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { CustomMessage } from '@molecules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAddUserVal } from './add-user.types';
import { SchemaAddUser } from './add-user.schema';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { apiGetRequest } from '@helpers';
import { endpoints } from '@config';

export const AddUserMol = ({
  open,
  setOpen,
  title,
  setTitle,
  type,
  setType,
  rowData,
  handleAddorEdit,
  isLoading,
}: any) => {
  const [companies, setCompanies] = useState([]);
  const [responseMessage, setResponseMessage] = React.useState<any>({
    error: null,
    message: null,
  });

  // FETCH COMPANIES API CALL
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data, status } = await apiGetRequest(endpoints?.getCompanies);
        const options = data?.data?.map((item: { title: any; _id: any }) => ({
          label: item?.title,
          value: item?._id,
        }));
        setCompanies(options);
      } catch (error) {}
    };
    fetchCompanies();
  }, []);

  let defaultValues = {
    userId: rowData?._id,
    firstName: rowData?.firstName || '',
    lastName: rowData?.lastName || '',
    email: rowData?.email || '',
    contactNumber: rowData?.contactNumber || '',
    companyId:
      { label: rowData?.companytitle, value: rowData?.companyId } || '',
    defaultRole: rowData?.defaultRole,
  };
  const {
    handleSubmit,
    control,
    reset,
    formState: {},
  } = useForm<IAddUserVal>({
    resolver: yupResolver(SchemaAddUser),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (type === 'Add') {
      reset({});
    } else {
      reset(defaultValues);
    }
  }, [rowData, type]);

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
          setTitle('Add User');
          setType('Add');
        }}
        width={'150px'}
        padding="10px"
      >
        Add User
      </CustomButton>
      <CustomModel
        open={open}
        setOpen={setOpen}
        styleModal={{
          height: { xs: '550px', md: '430px' },
          width: { lg: '45%', xs: '90%' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h2" sx={{ mb: 2, color: 'primary.dark' }}>
            {title}
          </Typography>
          <CloseOutlinedIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </Box>
        <form onSubmit={handleSubmit(handleAddorEdit)}>
          <Grid container columnSpacing={5} rowGap={3}>
            <Grid item md={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="First Name"
                padding="13px"
                placeholder="First Name"
                type="text"
                name="firstName"
                id="firstName"
                control={control}
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                disabled={type === 'View'}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="Last Name"
                padding="13px"
                placeholder="Last Name"
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="text"
                name="lastName"
                id="lastName"
                control={control}
                disabled={type === 'View'}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="Email"
                padding="13px"
                placeholder="Email"
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="email"
                name="email"
                id="email"
                control={control}
                disabled={type === 'View' || type === 'Update'}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="Contact Number"
                padding="13px"
                placeholder="Contact Number"
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="text"
                name="contactNumber"
                id="contactNumber"
                control={control}
                disabled={type === 'View'}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomReactSelect
                name="companyId"
                id="companyId"
                placeholder="Project Title"
                control={control}
                data={companies}
                label="Project Title"
                isRequired={true}
                fieldDisabled={type === 'View'}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="User Type"
                padding="13px"
                placeholder="Company Admin"
                styleTextField={{
                  fontSize: '14px',
                  backgroundColor: 'customShadows.primary',
                }}
                type="text"
                name="userType"
                control={control}
                disabled
              />
            </Grid>

            {(type === 'Add' || type === 'Update') && (
              <Grid item xs={12} textAlign="right">
                <Stack
                  spacing={2}
                  direction={{ xs: 'column', md: 'row' }}
                  alignItems={{ md: 'center' }}
                  justifyContent={{ xs: 'center', md: 'flex-end' }}
                >
                  {type == 'Update' && (
                    <CustomButton
                      variant="outlined"
                      background="#fff"
                      backgroundHover="primary.dark"
                      colorHover="#fff"
                      color="primary.dark"
                      fullWidth={false}
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </CustomButton>
                  )}

                  <CustomButton
                    background="primary.main"
                    type="submit"
                    fullWidth={false}
                    loading={isLoading}
                  >
                    {type}
                  </CustomButton>
                </Stack>
              </Grid>
            )}
            <Grid item xs={12} textAlign="left">
              <CustomMessage
                hasMessage={!!responseMessage?.message}
                text={responseMessage?.message}
                error={responseMessage?.error}
                isBold={true}
              />
            </Grid>
          </Grid>
        </form>
      </CustomModel>
    </>
  );
};
