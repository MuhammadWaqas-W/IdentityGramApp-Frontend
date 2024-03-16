import React, { useEffect, useState } from 'react';
import {
  CustomButton,
  CustomizedRadios,
  CustomModel,
  CustomTextField,
} from '@atoms';
import { addUserValidationSchema } from './add-user.schema';
import { useForm } from 'react-hook-form';
import { AddUserFormValuesType } from './addUser.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CustomMessage } from '@molecules';
import { assignRole } from '@constants';

export const AddUserOrganisms = ({
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
  const [responseMessage, setResponseMessage] = useState<any>({
    error: null,
    message: null,
  });

  let defaultValues = {
    userId: rowData?._id,
    firstName: rowData?.firstName || '',
    lastName: rowData?.lastName || '',
    email: rowData?.email || '',
    defaultRole: rowData?.defaultRole || '',
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: {},
  } = useForm<AddUserFormValuesType>({
    resolver: yupResolver(addUserValidationSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset(defaultValues);
  }, [rowData]);

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
          reset({});
        }}
        width={'150px'}
        padding="10px"
      >
        Add User
      </CustomButton>
      <CustomModel
        setOpen={setOpen}
        open={open}
        styleModal={{
          height: { xs: '550px', md: '470px' },
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
            <Grid item lg={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="First Name"
                name="firstName"
                type="text"
                control={control}
                placeholder="First Name"
                id="firstName"
                disabled={type === 'View'}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="Last Name"
                name="lastName"
                type="text"
                control={control}
                placeholder="Last Name"
                id="lastName"
                disabled={type === 'View'}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <CustomTextField
                fullWidth
                labelText="Email"
                name="email"
                type="email"
                control={control}
                placeholder="Email"
                id="email"
                disabled={type === 'View' || type === 'Update'}
              />
            </Grid>
            <Grid item lg={12}>
              <CustomizedRadios
                label={'Assign Role'}
                name="defaultRole"
                control={control}
                id="defaultRole"
                data={assignRole}
                row={true}
                labelWidth={300}
                isRequired={true}
                disabled={type === 'View'}
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
