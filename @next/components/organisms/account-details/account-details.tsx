import React, { useEffect, useState } from 'react';
import {
  Divider,
  ListItemButton,
  Typography,
  Box,
  List,
  ListItem,
} from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { CustomButton, CustomTextField } from '@atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileImageMolecule } from '@molecules';
import { edit, lockIcon, user2, tick } from '@icons';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@hooks';
import { updateProfileData } from '@store';
import { unwrapResult } from '@reduxjs/toolkit';
import { AccountDetailsSchema } from './account-details.schema';

export const AccountDetailsOrganism = ({ setOpen }: any) => {
  const [accDetails, setAccDetails] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector(
    (state: { profile: any }) => state.profile,
  );
  const { user } = useAppSelector((state: { auth: any }) => state.auth);
  let role = user?.roles?.length && user?.roles[0];

  const { email, firstName, lastName, defaultRole, title } = profileData;

  let defaultValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    productName: title,
  };
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(AccountDetailsSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    const { firstName, lastName } = data;
    let payload = {
      firstName: firstName,
      lastName: lastName,
      defaultRole: role,
    };
    try {
      const response = await dispatch(updateProfileData(payload));
      const { data, status } = unwrapResult(response);
      switch (status) {
        case 201:
        case 200:
          enqueueSnackbar(data?.message, {
            variant: 'success',
          });
          break;
        default:
          enqueueSnackbar(data?.message, {
            variant: 'error',
          });
          break;
      }
    } catch (error: any) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    } finally {
      setAccDetails(true);
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [profileData]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">Account Details</Typography>
          {accDetails && (
            <Image
              src={edit}
              alt="Edit"
              onClick={() => setAccDetails(false)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            mt: 4,
          }}
        >
          <ProfileImageMolecule drawer />
        </Box>
        {accDetails ? (
          <>
            <Divider />
            <List sx={{ mt: 4 }}>
              <ListItem disablePadding onClick={() => setOpen(false)}>
                <ListItemButton>
                  <Image src={user2} alt="Lock" width={22} />
                  <Typography variant="body1" sx={{ pl: 3 }}>
                    <Link
                      href="/app/my-profile"
                      style={{ textDecoration: 'none', color: '#2E285C' }}
                    >
                      My Profile
                    </Link>
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => setOpen(false)}>
                <ListItemButton>
                  <Image src={lockIcon} alt="Lock" />
                  <Typography variant="body1" sx={{ pl: 3 }}>
                    <Link
                      href="/app/change-password"
                      style={{ textDecoration: 'none', color: '#2E285C' }}
                    >
                      Change Password
                    </Link>
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '14px' }}>
            <CustomTextField
              type="text"
              name="firstName"
              id="firstName"
              labelText={'First Name'}
              control={control}
              fullWidth
            />
            <CustomTextField
              type="text"
              name="lastName"
              id="lastName"
              labelText={'Last Name'}
              control={control}
              fullWidth
            />
            <CustomTextField
              type="text"
              name="email"
              id="email"
              labelText={'Email'}
              control={control}
              fullWidth
              disabled
            />
            {role === 'COMPANY_ADMIN' && (
              <CustomTextField
                type="text"
                name="productName"
                id="productName"
                labelText={'Product Name'}
                control={control}
                fullWidth
                disabled
              />
            )}
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              <button
                type="submit"
                style={{
                  background: 'transparent',
                  outline: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Image src={tick} alt="tick" />
              </button>
            </Box>
          </form>
        )}
      </Box>
      <CustomButton
        type="button"
        padding="10px 15px"
        variant="outlined"
        border=""
        borderColor=""
        color=""
        background=""
        onClick={() => setOpen(false)}
      >
        <Typography
          variant="h6"
          sx={{
            transition: 'all .2s ease-in-out',
            display: 'flex',
            fontWeight: 400,
            '& span': {
              display: 'flex',
              '& :hover': {
                transform: 'scale(1.3)',
              },
            },
          }}
        >
          Back
        </Typography>
      </CustomButton>
    </Box>
  );
};
