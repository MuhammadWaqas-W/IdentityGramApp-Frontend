import React, { useEffect } from 'react';
import { CustomButton, CustomTextField } from '@components/atoms';
import { CustomMessage } from '@molecules';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  companyAdminValidationSchema,
  profileValidationSchema,
} from './edit-profile.schema';
import { useAppDispatch, useAppSelector } from '@hooks';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { updateProfileData } from '@store';
import Image from 'next/image';
import { calendar, product, smartphone, viewEmail, viewUser } from '@icons';

const EditProfile = ({ setEditProfile }: any) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [responseMessage, setResponseMessage] = React.useState<any>({
    error: null,
    message: null,
  });
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const { profileData } = useAppSelector(
    (state: { profile: any }) => state.profile,
  );
  const {
    email,
    firstName,
    lastName,
    defaultRole,
    contactNumber,
    createdAt,
    title,
  } = profileData;

  const companyDefaultValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    contactNumber: contactNumber,
    productName: title,
    date: moment(createdAt).format('yyyy-MM-DD'),
  };
  const USERSUPERDefaultValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    contactNumber: contactNumber,
  };

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(
      role === 'COMPANY_ADMIN'
        ? companyAdminValidationSchema
        : profileValidationSchema,
    ),
    defaultValues:
      role === 'COMPANY_ADMIN' ? companyDefaultValues : USERSUPERDefaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const onSubmit = async (data: any) => {
    const { firstName, lastName, contactNumber } = data;
    let payload = {
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      defaultRole: role,
    };
    try {
      const response: any = await dispatch(updateProfileData(payload));
      const { data, status } = unwrapResult(response);
      switch (status) {
        case 201:
        case 200:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          setEditProfile(false);
          break;
        default:
          setResponseMessage({ error: true, message: data?.message });
          break;
      }
    } catch (error: any) {
      setResponseMessage({ error: true, message: error?.message });
    }
  };

  useEffect(() => {
    reset(
      role === 'COMPANY_ADMIN' ? companyDefaultValues : USERSUPERDefaultValues,
    );
  }, [profileData]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setResponseMessage({ error: null, message: null });
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [responseMessage]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              type="text"
              name={'firstName'}
              id="firstName"
              control={control}
              fullWidth
              StartIcon={<Image src={viewUser} alt="viewUser" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              type="text"
              name={'lastName'}
              id="lastName"
              control={control}
              fullWidth
              StartIcon={<Image src={viewUser} alt="viewUser" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              type="text"
              name={'email'}
              id="email"
              control={control}
              fullWidth
              disabled
              StartIcon={<Image src={viewEmail} alt="viewEmail" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              type="text"
              name={'contactNumber'}
              id="contactNumber"
              control={control}
              fullWidth
              StartIcon={<Image src={smartphone} alt="smartphone" />}
            />
          </Grid>
          {defaultRole === 'COMPANY_ADMIN' && (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextField
                  type="text"
                  name="productName"
                  id="productName"
                  control={control}
                  fullWidth
                  disabled
                  StartIcon={<Image src={product} alt="product" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomTextField
                  type="date"
                  name="date"
                  id="date"
                  control={control}
                  fullWidth
                  disabled
                  EndIcon={<Image src={calendar} alt="product" />}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <CustomMessage
              hasMessage={!!responseMessage?.message}
              text={responseMessage?.message}
              error={responseMessage?.error}
              isBold={true}
            />
          </Grid>
          <Grid item xs={12} display="flex">
            <CustomButton
              onClick={() => setEditProfile(false)}
              background="white"
              color="primary.main"
              fullWidth={false}
              border="1px solid"
              backgroundHover="transparent"
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              fullWidth={false}
              margin="0 0 0 10px"
              loading={isSubmitting}
            >
              Update
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditProfile;
